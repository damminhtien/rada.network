import {  useMemo, createContext, useContext } from 'react'
import { types, applySnapshot, flow, onSnapshot } from 'mobx-state-tree'
import { gt } from 'lodash';

const StoreContext = createContext();

let store

const Wallet = types.model({
    address: types.optional(types.string, ""),
    showingConnect: types.optional(types.boolean, false)
}).views((self) => ({
    get isConnected() {
        return self.address !== ""
    },
})).actions(self => ({
    update(address) {
        self.address = address || ''
        if (address) self.showingConnect = false
    },
    showConnect(showing) {
        self.showingConnect = showing
    },
}))

const User = types.model({
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  access_token: types.optional(types.string, ""),
  image: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  showingConnect: types.optional(types.boolean, false)
}).views((self) => ({
  
})).actions(self => ({
  update(data) {
      self.id = data.id || ''
      self.name = data.name || ''
      self.access_token = data.access_token || ''
      self.image = data.image || ''
      self.email = data.email || ''
  },
  showConnect(showing) {
      self.showingConnect = showing
  },
}))

// Screen store to handle Responsive
const SCREENS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const SCREENS_WIDTH = [0, 640, 768, 1024, 1280, 1536]
const cmp = (s1, s2) => {
  const idx1 = SCREENS.indexOf(s1)
  const idx2 = SCREENS.indexOf(s2)
  return idx1 > idx2 ? 1 : (idx1 < idx2 ? -1 : 0)
}
const Screen = types.model({
  width: 0,
  name: 'xs'
}).views(self => ({
  get fromSm() {return cmp(self.name, 'sm') >= 0},
  get fromMd() {return cmp(self.name, 'md') >= 0},
  get fromLg() {return cmp(self.name, 'lg') >= 0},
  get fromXl() {return cmp(self.name, 'xl') >= 0},
  get from2xl() {return cmp(self.name, '2xl') >= 0},

  get uptoXs() {return cmp(self.name, 'xs') <= 0},
  get uptoSm() {return cmp(self.name, 'sm') <= 0},
  get uptoMd() {return cmp(self.name, 'md') <= 0},
  get uptoLg() {return cmp(self.name, 'lg') <= 0},
  get uptoXl() {return cmp(self.name, 'xl') <= 0},
})).actions(self => ({
  update(width) {
    self.width = width
    let i = 0
    while (i<SCREENS.length-1 && width >= SCREENS_WIDTH[i+1]) i++
    self.name = SCREENS[i]
  }
}))


const Store = types
  .model({
    wallet: types.optional(Wallet, {}),
    user: types.optional(User, {}),
    inited: false,
    shallowInternal : false,
    screen: types.optional(Screen, {})
  }).actions((self) => ({
    afterCreate() {
        //self.wallet.loadWallet()
    },
    setShallowConnect(value){
      self.shallowInternal = value
    },
    updateScreenWidth(width) {
      self.screen.update(width)
    }
  }))

export function initializeStore() {
  const _store = store ?? Store.create({wallet: {},user : {}, projects: {}})

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
//   if (snapshot) {
//     applySnapshot(_store, snapshot)
//     _store.inited = true
//   }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // reset width
  _store.updateScreenWidth(0)

  // Create the store once in the client
  if (!store) store = _store
  if (typeof window !== 'undefined') window.store = store
  return store
}

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// }

export function StoreProvider({ children }) {
    const store = initializeStore()
    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    );
  }
  
export function useStore() {
    return useContext(StoreContext);
}

export default useStore;