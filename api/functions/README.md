# Graphcool Types 調査

## Tips

Function内で、eventをそのまま返すと  
二重登録になる。

以下のように、オブジェクトに入れて返す。
```js
// False
export default event => {
  ...
  return event
}

// True
export default event => {
  ...
  return { event }
}
```