# Systems

**ResourcesSystem**

_dependencies_

- getResource(resId, townId?)

_commands_

- increaseAmount(resourcesTypeId, amount, townId?)
- decreaseAmount(resourcesTypeId, amount)
- increaseMaxLimit(resourcesTypeId, amount, townId?)
- decreaseMaxLimit(resourcesTypeId, amount, townId?)

---

**RequirementsSystem**

_dependencies_

- getTownData(townId)

_commands_

- check(requirements, townId)

---

**BuildingsSystem**

_dependencies_

- getBuildingConfig(buildingTypeId)
- getBuildingById(buildingId)

_commands_

- build(buildingTypeId, townId)
- update(buildingId)
- downgrade(buildingId)
- destroy(buildingId)

---

**InventorySystem**

_dependencies_

- getItemConfig(itemId)
- getItems()

_commands_

- add(itemTypeId, amount)
- use(itemTypeId, {townId?, buildingId?})

---

**ShopSystem**

_dependencies_

- getItemConfig(itemId)
- addItem(itemTypeId, amount)

_commands_

- buy(itemTypeId, amount)

---

**SpeedupSystem**

_dependencies_

- getItemConfigById(itemConfigId)
- getBuildingById(buildingId)
- decreaseItemAmount(itemId, amount)

_commands_

- speedupBuild(buildingId, itemTypeId)
- speedupUnitTraining(buildingId, itemTypeId)

---
