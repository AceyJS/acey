
<p align="center" font-style="italic" >
  <a href="https://rnds.netlify.com/">
    <img alt="react-ascey" src="https://i.postimg.cc/wvCsGXdM/ascey.png" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

# A MVC oriented state manager. (Better than Redux)

Ascey is a-based-MVC state manager for your React apps.
It is built on top of Redux and makes easy the maintenance of an organized and scalable architecture on medium and large apps.


## Better than Redux, how ?

Redux is a great state manager and this is the reason why it got so much success and created a new whole ecosystem of open source libraries.
This is also why Ascey is build on top of it, using its API to work.

#### Redux has for weekness, its strength : The boilerplate 
- Actions {function|type}
- Reducers
- Connect
- Selectors ([reselect](https://github.com/reduxjs/reselect)), 
- Middlewares ([saga](https://github.com/redux-saga/redux-saga), [thunk](https://github.com/reduxjs/redux-thunk), [logger](https://github.com/LogRocket/redux-logger))
- Util formatting functions
- Redundant imports in your components (actions, selectors, utils formatting)


### This is too much.
The redux boilerplate is clean and enable you to make a good organization on small apps. 
Still, more and more, you add actions and reducers (and so data to handle), more you find yourself feeling the architecture messy, hard to maintain, and a significant drop concerning your productivity working on the project.


### Why ?

Because your app has "100" different action types, "12" different reducers, "70" differents action functions, and I'm not talking about your selectors and utility functions distributed in dozen of files.
That means that iterating on this app is painful, and your ability to keep developing your app while maintaing a high standard in term of organization decreases.

#### In other words, you lose productivity and you don't like what you are doing.

<br />

<br />

## These are the WHY of Ascey.




