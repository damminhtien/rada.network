import {observer} from "mobx-react"
import {usePageStore} from "../lib/usePageStore"
import _ from "lodash"
import { useTranslation } from "next-i18next"
import { DISPLAY_SOURCES, LIST_SOURCE, LIST_URLS } from "../config/links"
import { useRef,useEffect } from "react"


const PostNotice = observer(({type,setTabCallback}) => {
  const {detailStore} = usePageStore()
  const {t} = useTranslation()
  const mainNotice = useRef()
  if (_.isEmpty(detailStore.data)){
    return null
  }
  useEffect(() => {
    if (mainNotice.current) {
      mainNotice.current.querySelectorAll('.post-token').forEach((el) => {
        el.addEventListener('click', handleClickToken)
      })
    }
    return () => {
      if (mainNotice.current) {
        mainNotice.current.querySelectorAll('.post-token').forEach((el) => {
          el.removeEventListener('click', handleClickToken);
        })
      }
    }
  },[detailStore.data])
  type = type || "news"
  if (detailStore.data.websiteUri === null) return null
  const source = type == "news" ? getSourceNewsFromUri(detailStore.data) : getSourceVideoFromUri(detailStore.data)
  let keywordText = detailStore.data.tokens.map((item) => {
    return `<a href="" data-key="${item.id}" rel="nofollow" class="link post-token"><strong>${item.name.toUpperCase()}</strong></a>`
  })
  let startString = type == "news" ? ` ${t("post notice start")}
  <a href="${source.url}" rel="nofollow noreferrer" target="_blank" class="link ml-1">
    <strong>${source.name}</strong> 
    <span class="icon ml-1"><i class="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
  </a>`
  :
  ` ${t("post notice video start")}
  <a href="${source.url}" rel="nofollow noreferrer" target="_blank" class="link ml-2">
    <strong>${source.name}</strong> 
    <span class="icon ml-1"><i class="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
  </a>`;
  let about = type == "news" ? `<span class="mx-2">${t("about keyword")}</span>` : `<span class="mx-2">${t("about video keyword")}</span>`
  keywordText = keywordText.join(", ")
  let text = detailStore.data.tokens.length > 0 ? startString + about + keywordText : startString
  
  const handleClickToken = (e) => { 
    e.preventDefault();
    e.stopPropagation();
    setTabCallback(e.currentTarget.getAttribute('data-key'))
    return false
  }
  return (
    <>
    <div className="post-notice" ref={mainNotice}>

      <div className="flex items-center">
        <p dangerouslySetInnerHTML={{__html: text}} />
      </div>

    </div>

    </>
  )
})
function getSourceNewsFromUri(item){
  if (item.grabTopic !== null){
    return {name : item.grabTopic.website.name,url : item.grabTopic.website.url}
  }
  const websiteUri = item.websiteUri !== null ? item.websiteUri : ""
  const displaySources = DISPLAY_SOURCES
  const listSources = LIST_SOURCE
  const listUrl = LIST_URLS
  for (const [i, value] of listSources.entries()) {
    if (websiteUri.toLowerCase().includes(value)) {
      return {name : displaySources[i],url : listUrl[i]}
    }
  }
  return ""
}
function getSourceVideoFromUri(item){
  if (item.grabTopic !== null){
    return {name : item.grabTopic.name,url : item.grabTopic.url}
  }
  return {name : "RADA",url : "https://rada.network"}
}

export default PostNotice