## Example for not working combination of Draft + Undo-Middleware with Mobx Keystone

```bash
$ jest
 FAIL  src/use-with-undo.test.ts
  Root
    ✕ should support drafts wrapped in undo/redo middleware  (273 ms)

  ● Root › should support drafts wrapped in undo/redo middleware

    tweak can only work over models, observable objects/arrays, or primitives, but got [object Object] instead

      at failure (node_modules/mobx-keystone/src/utils/index.ts:30:10)
      at apply (node_modules/mobx-keystone/src/tweaker/tweak.ts:89:9)
      at executeAction (node_modules/mobx/src/core/action.ts:65:19)
      at tweak (node_modules/mobx/src/core/action.ts:46:16)
      at Array.interceptObjectMutation (node_modules/mobx-keystone/src/tweaker/tweakPlainObject.ts:233:25)
      at interceptChange (node_modules/mobx/src/types/intercept-utils.ts:34:22)
      at ObservableObjectAdministration.setObservablePropValue_ (node_modules/mobx/src/types/observableobject.ts:132:28)
      at ObservableObjectAdministration.set_ (node_modules/mobx/src/types/observableobject.ts:189:29)
      at Object.set (node_modules/mobx/src/types/dynamicobject.ts:39:31)
      at setModelInstanceDataField (node_modules/mobx-keystone/src/modelShared/Model.ts:85:3)
```
