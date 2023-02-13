# Solutions for Exercise 1.1-1.2
https://fullstackopen.com/en/part1/introduction_to_react#exercises-1-1-1-2

## Exercise 1.1
Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

Define the new components in the file App.js.

The App component's body will approximately be as follows:
```
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```

## Exercise 1.2
Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. Instead, it only renders three Part components of which each renders the name and number of exercises of one part.

```
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```