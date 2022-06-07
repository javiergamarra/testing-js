import { Shop, Item } from '../gilded_rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('foo');
    expect(items[0].quality).toEqual(0);
  });

  it('elements should decrease in quality and sellIn by 1', () => {
    const gildedRose = new Shop([new Item('bar', 2, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('bar');
    expect(items[0].quality).toEqual(1);
    expect(items[0].sellIn).toEqual(1);
  });

  it('elements should decrease several times if several days passed', () => {
    const gildedRose = new Shop([new Item('bar', 2, 2)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('bar');
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toEqual(0);
  });

  it('element expired degrades faster', () => {
    const gildedRose = new Shop([new Item('bar', 0, 2)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('bar');
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toEqual(-1);
  });

  it('element expired degrades faster when quality 3', () => {
    const gildedRose = new Shop([new Item('bar', 0, 3)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('bar');
    expect(items[0].quality).toEqual(1);
    expect(items[0].sellIn).toEqual(-1);
  });

  it('The Quality of an item is never negative', () => {
    const gildedRose = new Shop([new Item('bar', 10, 1)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('bar');
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toEqual(8);
  });

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 10, 1)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Aged Brie');
    expect(items[0].quality).toEqual(3);
    expect(items[0].sellIn).toEqual(8);
  });

  it('"The Quality of an item is never more than 50', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 10, 49)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Aged Brie');
    expect(items[0].quality).toEqual(50);
    expect(items[0].sellIn).toEqual(8);
  });

  it('"Sulfuras" being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 49)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toEqual(49);
    expect(items[0].sellIn).toEqual(10);
  });

  it('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].quality).toEqual(12);
    expect(items[0].sellIn).toEqual(9);
  });

  it('"Backstage passes", Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].quality).toEqual(13);
    expect(items[0].sellIn).toEqual(4);
  });

  it('"Backstage passes",  Quality drops to 0 after the concert', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toEqual(-1);
  });

  it('"Conjured", items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new Shop([new Item('Conjured', 10, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Conjured');
    expect(items[0].quality).toEqual(8);
    expect(items[0].sellIn).toEqual(9);
  });

  it('"Conjured", items degrade in Quality twice as fast as normal items when sellin', () => {
    const gildedRose = new Shop([new Item('Conjured', 0, 10)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual('Conjured');
    expect(items[0].quality).toEqual(6);
    expect(items[0].sellIn).toEqual(-1);
  });
});
