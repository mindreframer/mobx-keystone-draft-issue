## Example for not working combination of Draft + Undo-Middleware with Mobx Keystone

```bash
$ jest
  Root
    ✓ should support drafts wrapped in undo/redo middleware  (36 ms)

  console.log
    UNDO EVENTS: []

      at logAll (src/use-with-undo.test.ts:7:11)

  console.log
    DRAFT BEFORE COMMIT {
      "data": {
        "$modelType": "myApp/Settings",
        "$": {
          "tags": [
            {
              "$modelType": "myApp/Tag",
              "$": {
                "label": "tag1",
                "$modelId": "2-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
              }
            }
          ],
          "name": "",
          "$modelId": "4-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
        }
      },
      "originalData": {
        "$modelType": "myApp/Settings",
        "$": {
          "tags": [
            {
              "$modelType": "myApp/Tag",
              "$": {
                "label": "tag1",
                "$modelId": "2-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
              }
            },
            {
              "$modelType": "myApp/Tag",
              "$": {
                "label": "tag2",
                "$modelId": "3-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
              }
            }
          ],
          "name": "",
          "$modelId": "4-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
        }
      }
    }

      at logAll (src/use-with-undo.test.ts:7:11)

  console.log
    DRAFT AFTER COMMIT {
      "data": {
        "$modelType": "myApp/Settings",
        "$": {
          "tags": [
            {
              "$modelType": "myApp/Tag",
              "$": {
                "label": "tag1",
                "$modelId": "2-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
              }
            }
          ],
          "name": "",
          "$modelId": "4-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
        }
      },
      "originalData": {
        "$modelType": "myApp/Settings",
        "$": {
          "tags": [
            {
              "$modelType": "myApp/Tag",
              "$": {
                "label": "tag1",
                "$modelId": "2-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
              }
            }
          ],
          "name": "",
          "$modelId": "4-S8ORRx5UwrdHw4TCuMOUMzTDgEYdeQ=="
        }
      }
    }

      at logAll (src/use-with-undo.test.ts:7:11)

```
