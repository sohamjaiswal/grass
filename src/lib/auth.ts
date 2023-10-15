import { Body, fetch } from '@tauri-apps/api/http'
import type { GuildedMe, UserStatus } from './types/GuildedMe'
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const me: Writable<GuildedMe | null> = localStorageStore<GuildedMe | null>("me", null)
export const oldStatus: Writable<UserStatus | null> = localStorageStore<UserStatus | null>("oldStatus", null)

export const login = async (email: string, password: string) => {
  const res = await fetch("https://www.guilded.gg/api/login", {
      method: "POST",
      body: Body.json({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      console.log(res.rawHeaders)
      const cookies = res.rawHeaders['set-cookie']
      if (cookies) {
        localStorage.setItem("guildedCookies", JSON.stringify(cookies))
        getSelf()
    } else {
        alert("Couldnt get cookie, aborted")
        return
    }
    } else {
      alert("Invalid credentials");
    }
}

export const getSelf = async () => {
  const cookies = localStorage.getItem("guildedCookies")
  // convert cookies to requestable format
  if (!cookies) {
    console.log("no cookies")
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  console.log("cookieArr", cookiesArr)
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  console.log("cookiesStr", cookie)
  const res = await fetch("https://www.guilded.gg/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie
    }
  })
  if (res.ok) {
    console.log(res.data)
    me.set(res.data as GuildedMe)
    return localStorage.getItem("me")
  }
  me.set(null)
  return localStorage.getItem("me")
}

export const restoreStatus = async () => {
  const cookies = localStorage.getItem("guildedCookies")
  const oldStatus = localStorage.getItem("oldStatus")
  // convert cookies to requestable format
  if (!cookies) {
    console.log("no cookies")
    return null
  }
  if (!oldStatus) {
    console.log("no prior status backup!")
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  console.log("cookieArr", cookiesArr)
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  console.log("cookiesStr", cookie)
  const res = await fetch("https://www.guilded.gg/api/users/me/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie
    },
    body: Body.json(JSON.parse(oldStatus))
  })
  console.log(res)
  if (res.ok) {
    return await getSelf()
  }
  return null
}
export async function saveCurrStatus() {
  const currUserData = await getSelf()
  if (!currUserData) {
    return null
  }
  const currUserDataObj = JSON.parse(currUserData)
  const status = currUserDataObj.user.userStatus
  if (!status) {
    return null
  }
  oldStatus.set(status)
  return localStorage.getItem("oldStatus")
}
export const logout = async () => {
  const cookies = localStorage.getItem("guildedCookies")
  // convert cookies to requestable format
  if (!cookies) {
    console.log("no cookies")
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  console.log("cookieArr", cookiesArr)
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  console.log("cookiesStr", cookie)
  const res = await fetch("https://www.guilded.gg/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie
    }
  })
  if (res.ok) {
    localStorage.removeItem("guildedCookies")
    me.set(null)
    return true
  }
  return false
} 