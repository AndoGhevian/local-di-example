import { DictWithout, nest, reassign } from "./util/reassign";

const deps = {
  useGreetings: Object.assign(() => "Hello World!" as string, {
    fakeGen: (greetings: string) => () => greetings
  })
}

const buildApp = ({useGreetings: useGreetings}: DictWithout<typeof deps, "fakeGen">) =>
function App() {
  const greetings = useGreetings();
  return <div>{ greetings }</div>;
}

export const App = Object.assign(buildApp(deps), { 
  deps,
  testGen: reassign(buildApp, {
    useGreetings: nest("greetings", deps.useGreetings.fakeGen)
  })
})
