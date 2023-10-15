import { Body, fetch } from '@tauri-apps/api/http'
import type { GuildedMe, GuildedMediaUpload, UserStatus } from './types/GuildedMe'
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api';

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
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  const res = await fetch("https://www.guilded.gg/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie
    }
  })
  if (res.ok) {
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
    return null
  }
  if (!oldStatus) {
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  const res = await fetch("https://www.guilded.gg/api/users/me/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie
    },
    body: Body.json(JSON.parse(oldStatus))
  })
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
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
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
export const updateStatus = async (newStatus: UserStatus) => {
  const cookies = localStorage.getItem("guildedCookies")
  if (!cookies) {
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  const res = await fetch("https://www.guilded.gg/api/users/me/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie
    },
    body: Body.json(newStatus)
  })
  if (res.ok) {
    return await getSelf()
  }
  return null
}
export const uploadImageFromLink: (link:string) => Promise<GuildedMediaUpload | null> = async (link: string) => {
  console.log("uploading image from link")
  const cookies = localStorage.getItem("guildedCookies")
  if (!cookies) {
    return null
  }
  const cookiesArr = (await JSON.parse(cookies as string)) as string[]
  const cookiesArrFirstEls = cookiesArr.map((cookie) => {
    return cookie.split(";")[0]
  })
  const cookie = cookiesArrFirstEls.join(";")
  const imageData = await invoke('get_img_data', {src: link}) as Uint8Array
  if (!imageData) {
    console.log("no image data")
    return null
  }
  console.log(imageData)
  const res = await fetch("https://media.guilded.gg/media/upload?dynamicMediaTypeId=ContentMediaGenericFiles", {
    method: "POST",
    headers: {
      "Content-Type": 'multipart/form-data',
      cookie
    },
    body: Body.form({
      file: {
        file: imageData as Uint8Array,
        mime: "image/jpg",
        fileName: "image.jpeg",
      }
    })
  })
  if (res.ok) {
    console.log("image uploaded")
    return res.data as GuildedMediaUpload
  }
  console.log("image upload failed")
  return null
}