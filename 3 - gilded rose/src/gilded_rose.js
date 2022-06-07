export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(item, value = 1) {
    if (item.quality < 50 && item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.quality += value;
    }
  }

  decreaseQuality(item, value = 1) {
    if (item.quality > 0 && item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.quality -= value;
    }
  }

  decreaseSellIn(item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1;
    }
  }

  updateQuality() {
    for (const item of this.items) {
      const { name } = item;

      this.decreaseSellIn(item);

      if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.modifyBackstagePassesQuality(item);
      } else if (name === 'Aged Brie') {
        this.increaseQuality(item);
      } else {
        let value = item.sellIn < 0 ? 2 : 1;

        if (name.includes('Conjured')) {
          value *= 2;
        }

        this.decreaseQuality(item, value);
      }
    }

    return this.items;
  }

  modifyBackstagePassesQuality(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      this.increaseQuality(item);
      if (item.sellIn < 6) {
        this.increaseQuality(item, 2);
      } else if (item.sellIn < 11) {
        this.increaseQuality(item);
      }
    }
  }
}
