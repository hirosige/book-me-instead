# Book Me Instead Backend

`auth0` | `graphcool` | `create-react-app` | `graphql` |

## Functions

### 1. Hook Functions

CRUDの前後で発火される同期用関数。
基本的には、`データのバリデーション`と`作成後のデータ変換（大文字/小文字矯正、日付変換等）`

### 2. Subscription Functions

何らかの特定のイベントをトリガーにサードパーティのAPIをキックが主目的。
よって、`Hook`や`Resolver`にこれらの処理を含めてはならないものと思われる。

### 3. Resolver Functions

基本的には、標準モデルの拡張。
その中で、外部REST APIをラップするような使い方もあり。
User認証関数をキックして外部で認証する等。

