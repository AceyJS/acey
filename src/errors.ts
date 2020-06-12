import Model from './model'

export default {
    unauthorizedSave: (m: Model) => new Error(`You've attempted to call save in the ${m.is().collection() ? 'Collection' : 'Model'} ${m.constructor.name} but you either didn't specify it as a connected ${m.is().collection() ? 'Collection' : 'Model'} or didn't specify the config has done at the root of your project: "config.done()"`),
    unauthorizedCookieAdd: (m: Model) => new Error(`You've attempted to call cookie in the ${m.is().collection() ? 'Collection' : 'Model'} ${m.constructor.name} (key: ${m.option().key()}), but this functionnality is unavailable in it for these reasons:\n1. Doesn't have a unique specified key in the building options.\n2. It is not connected to the store.\n3. You didn't specify the config has done at the root of your project: "config.done()"\n4. You are using React Native`),
    unauthorizedLocalStore: (m: Model) => new Error(`You've attempted to call localStore in the ${m.is().collection() ? 'Collection' : 'Model'} ${m.constructor.name} (key: ${m.option().key()}), but this functionnality is unavailable in it for these reasons:\n1. Doesn't have a unique specified key in the building options.\n2. It is not connected to the store\n3. You didn't specify the config has done at the root of your project: "config.done()"\n4. You are using NextJS.`),

    onlyObjectOnModelState: () => new Error(`The state of a Model, can only be instanced and replaced with an object type.`),
    onlyArrayOnCollectionState: () => new Error(`The state of a Collection, can only be instanced and replaced with an array type.`),
    
    uniqKeyRequiredOnNextJS: () => new Error(`In a NextJS environment you need to manually setup a unique key for every connected Model and Collection you instance.`),
    keyAlreadyExist: (key: string) => new Error(`You have 2 connected Models/Collections using the same key: ${key}.`),

    forbiddenArrayModel: (m: Model) => new Error(`${m.constructor.name}'s state contains an Array of Model. Please use a Collection instead.`),
    forbiddenNestedConnexion: (m: Model) => new Error(`${m.constructor.name} contains a connected Model. Connected Models can't be nested`),
    forbiddenMultiDimCollection: () => new Error(`You can't build a Collection with a Collection as a node element`),
    forbiddenModelCollection: () => new Error("You can't build a Collection with a Model as a collection element"),

    cookieDisabledOnRN: () => new Error(`Cookie Management is not accessible on React Native, please use local store instead.`),
    cookieMaxLengthReached: (key: string, max: number, length: number) => new Error(`You've attempted to set cookie with the (key: ${key}), but this action can't be executed because the max length of a cookie is ${max} for most browsers, the one you set was ${length}.`),

    unsetLocalStore: () => new Error(`The local store engine should be set manually at the root of your app when using React-Native -> config.setStoreEngine(AsyncStore)`),
    localStoreDisabled: () => new Error(`Local store is not accessible for one of these reasons.\n1. Local store doesn't work with NextJS.\n2. The local store engine should be set manually at the root of your app if using React-Native -> config.setStoreEngine(AsyncStore)`),
    cookiePriorityOverStore: () => new Error(`You've attempted to add to the local store, a data already present in the cookies. Cookies have priority over local store, empty your cookes linked with the key before performing this action.`),

    configNotDone: () => new Error(`You need to specify the config has done at the root of your project: "config.done()" to run Acey.`)
}


