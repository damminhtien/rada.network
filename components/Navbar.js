import Link from 'next/link'
import {useRouter} from 'next/router'
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {observer} from "mobx-react";
import {useStore} from "../lib/useStore";
import { useTranslation } from 'next-i18next';
import utils from "../lib/util";

import Screen from "./utils/Responsive";
import { usePageStore } from '../lib/usePageStore';

export const Navbar = observer(({}) => {
  const {dataStore,detailStore} = usePageStore()
  const { t } = useTranslation("navbar")
  return (
    <>
      <nav className={`navbar`}>

        <Screen from="lg">
        <div className="logo">
          {/* Logo */}
          <Link href={`/`}>
            <a className="flex flex-col w-full justify-center items-center">
              <img className="logo--img" src={process.env.NEXT_PUBLIC_CDN + "/images/rada-animate.svg"} alt="RADA NETWORK" />
              <strong className="logo--text mt-1">
                <span>RADA</span>
              </strong>
              <span className="logo--badge">BETA</span>
            </a>
          </Link>
        </div>
        </Screen>

        {/* Main Nav */}
        <div className={`navbar-main`} >

          <NavItem  href={"/" + dataStore.lang + "/explore/projects"} type={"projects"}>
            <span className="icon"><i className="fad fa-coins" /></span>
            <span className="nav-item--text">{t("Projects")}</span>
          </NavItem>

          <NavItem   href={"/" + dataStore.lang + "/explore/rada"} type={"rada"}>
            <span className="icon icon-rada">
              <svg className="rada-svg" viewBox="4 4 32 32" xmlns="http://www.w3.org/2000/svg">
                <path className="inline-rec" d="M18 11.1547C19.2376 10.4402 20.7624 10.4402 22 11.1547L26.6603 13.8453C27.8979 14.5598 28.6603 15.8803 28.6603 17.3094V22.6906C28.6603 24.1197 27.8979 25.4402 26.6603 26.1547L22 28.8453C20.7624 29.5598 19.2376 29.5598 18 28.8453L13.3397 26.1547C12.1021 25.4402 11.3397 24.1197 11.3397 22.6906V17.3094C11.3397 15.8803 12.1021 14.5598 13.3397 13.8453L18 11.1547Z" fill="#9CA3AF"/>
                <path className="inline-stroke" d="M20 2L20.8806 15.1519C20.9757 16.5717 22.4811 17.4409 23.7582 16.8133L35.5885 11L24.6389 18.3386C23.4568 19.1308 23.4568 20.8692 24.6389 21.6614L35.5885 29L23.7582 23.1867C22.4811 22.5591 20.9757 23.4283 20.8806 24.848L20 38L19.1194 24.8481C19.0243 23.4283 17.5189 22.5591 16.2418 23.1867L4.41154 29L15.3611 21.6614C16.5432 20.8692 16.5432 19.1308 15.3611 18.3386L4.41154 11L16.2418 16.8133C17.5189 17.4409 19.0243 16.5717 19.1194 15.152L20 2Z" fill="#fff"/>
                <circle className="inline-circle" cx="20" cy="7" r="3" fill="#374151"/>
                <circle className="inline-circle" cx="20" cy="33" r="3" fill="#374151"/>
                <circle className="inline-circle" cx="31.2583" cy="13.5" r="3" transform="rotate(60 31.2583 13.5)" fill="#374151"/>
                <circle className="inline-circle" cx="8.74167" cy="26.5" r="3" transform="rotate(60 8.74167 26.5)" fill="#374151"/>
                <circle className="inline-circle" cx="8.74167" cy="13.5" r="3" transform="rotate(-60 8.74167 13.5)" fill="#374151"/>
                <circle className="inline-circle" cx="31.2583" cy="26.5" r="3" transform="rotate(-60 31.2583 26.5)" fill="#374151"/>
              </svg>
            </span>
            <span className="nav-item--text">{t("Raders")}</span>
          </NavItem>


          <NavItem   href={"/" + dataStore.lang + "/explore/news"} type={"news"}>
            <span className="icon"><i className="fad fa-newspaper" /></span>
            <span className="nav-item--text">{t("News")}</span>
          </NavItem>

          <NavItem  href={"/" + dataStore.lang + "/explore/video"}  type={"video"}>
            <span className="icon"><i className="fad fa-icons" /></span>
            <span className="nav-item--text">{t("Video")}</span>
          </NavItem>

          <NavItem href={"/" + dataStore.lang + "/explore/all"} type={"all"}>
            <span className="icon"><i className="fad fa-rss" /></span>
            <span className="nav-item--text">{t("Explore")}</span>
          </NavItem>
          
          {/* <NavItem  href={"/" + dataStore.lang + "/explore/social"} type={"social"} className="disabled">
            <span className="icon"><i className="fad fa-fire-alt" /></span>
            <span className="nav-item--text">{t("Signals")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem> */}

          {/* Example of additional filters */}
          {/* <span className="nav-item--divider"></span> */}

          {/* <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/explore/games"}  type={"games"} className="disabled">
            <span className="icon"><i className="fad fa-chess-knight" /></span>
            <span className="nav-item--text">{t("Games")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/explore/defi"}  type={"defi"} className="disabled">
            <span className="icon"><i className="fad fa-coins" /></span>
            <span className="nav-item--text">{t("DeFi")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem> */}

          {/*<NavItem href="/explore/projects">*/}
          {/*  <span className="icon"><i className="fa-duotone fa-code-branch" /></span>*/}
          {/*  <span className="nav-item--text">Projects</span>*/}
          {/*</NavItem>*/}
          {/*<NavItem href="/explore/blog">*/}
          {/*  <span className="icon"><i className="fa-duotone fa-pen-nib" /></span>*/}
          {/*  <span className="nav-item--text">Blog</span>*/}
          {/*</NavItem>*/}
        </div>
      </nav>

    </>
  );
})

const NavItem = ({className, href, children,type}) => {
  const {dataStore,detailStore} = usePageStore()
  const router = useRouter()
  const store = useStore()
  const cls = []
  cls.push(`nav-item`)
  cls.push(className)
  if (dataStore.type === type || (type === "all" && dataStore.type === "")) cls.push(`nav-item-active`)

  const handleClickNavBar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dataStore.loadingButton) return false
    dataStore.type = e.currentTarget.getAttribute("datatype")
    dataStore.tweets = []
    dataStore.loadingButton = true;
    detailStore.data = {}
    store.setShallowConnect(true);
    router.push(e.currentTarget.getAttribute("href"),e.currentTarget.getAttribute("href"),{shallow:true})
    dataStore.meta = utils.createSiteMetadata({page:"Explore",data : {query : dataStore.type}})
    getItems({
      take : HOME_ITEM_TAKE,
      skip : dataStore.tweets.length,
      orderBy : dataStore.currentTab === "latest" ? {createdAt : "desc"} : {totalVote : "desc"},
      query : dataStore.query,
      type : dataStore.type,
      lang : dataStore.lang
    }).then(function (res){
      dataStore.loadingButton = false;
      dataStore.addTweet(res.data.itemFeed)
    })
    return false
  }
  return (
    <a href={href} className={cls.join(' ')} datatype={type}  onClick={(e) => {handleClickNavBar(e)}}>
      <>
        {children}
      </>
    </a>
  )
}