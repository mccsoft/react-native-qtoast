# react-native-qtoast

Toast component for React Native

Features:
- Simultaneous display: specify, how many toasts you want to show on screen at once
- Queueing: add toasts to a queue so that they will be shown sequentially
- Typed with Typescript
- Fully customizable

## Installation

```sh
npm install react-native-qtoast
```

## Usage

Wrap your app in ToastProvider component:

```js
import { ToastProvider } from 'react-native-qtoast';

export default function App() {
  return (
    <ToastProvider>
      <RootComponent />
    </ToastProvider>
  );
}
```

Then use 'useToast' hook inside any of your components:
```js
import { useToast } from 'react-native-qtoast';

const Component = () => {
  const { show } = useToast();

  useEffect(() => show(
    {
      children: <Text>Hello, World!</Text>,
      timeout: 1000
    }
  ), []);
}
```

## Methods

All of the methods that come from **useToast()** hook

### `show()`

Adds new toast to the query and shows it immediately. Adding new toast when there are [amountOfShownToast](#amountofshowntoasts) of toasts on the screen won't show it until one of the shown toast is dismissed.

Returns the **id** of created toast.

```js
show({
  children: ReactNode | undefined,
  timeout: number | undefined,
  onShow: () => Promise<void> | undefined
  onHide: () => Promise<void> | undefined
}): string
```

`children`: the view of your toast. If `undefined`, nothing will show.
\
`timeout`: specifies how long (in ms) the toast will be on the screen. If undefined, **stays forever**, until [hide]() is called.
\
`onShow`: a callback that fires **after** the toast is rendered
\
`onHide`: a callback that fires **before** the toast is removed from query

### `hide()`

Removes toast with specified **id** from query

```js
hide(
  id: string | undefined
)
```

`id`: the id of the toast from query. If undefined, clears the query, calling onHide for each shown toast beforehand

### `pause()`

Pauses toast, so that it won't dismiss after its timeout is over. Remembers how much time of timeout is left (see [unpause](#unpause) for more details).

```js
pause(
  id: string | undefined
)
```

`id`: the id of the toast from query. If undefined, pauses all toasts on screen.

### `unpause()`

Unpauses toast, making it live for the rest of the timeout it has left.

```js
unpause(
  id: string | undefined
)
```

`id`: the id of the toast from query. If undefined, unpauses all toasts on screen.

## ToastProvider props

```js
<ToastProvider
  amountOfShownToasts={2}
  containerStyle={{ gap: 2 }}
  inverted={true}
/>
```

### amountOfShownToasts

Determines how many toasts can be rendered on the screen on the same time. If undefined, sets to 3.

### containerStyle

The style of the container that wraps all toasts. Uses `StyleProp<ViewStyle>`.

### inverted

Determines the order in which toasts are shown.
If `true`, new toast will be shown below previous, `false` or `undefined` makes new toast appear above previous.

## License

MIT
