import React, { FC, useEffect, useState } from 'react';
import styles from './item.less';
import { ItemModelState, connect, ConnectProps, Dispatch } from 'umi';
import { Row, Col, Radio, Card } from 'antd';

interface PageProps extends ConnectProps {
  item: ItemModelState;
  dispatch: Dispatch;
}
const RadioGroup = Radio.Group;
const itemType = [
  { key: 0, value: 'All' },
  { key: 1, value: 'Attack' },
  { key: 2, value: 'Magic' },
  { key: 3, value: 'Defense' },
  { key: 4, value: 'Move' },
  { key: 5, value: 'Jungle' },
  { key: 7, value: 'Support' },
];

const Item: FC<PageProps> = ({ item, dispatch }) => {
  const { items = [], filterKey = 0 } = item;

  const [translatedItems, setTranslationItems] = useState<any>(items);
  useEffect(() => {
    const targetLanguage = 'en'; // English

    const translateItemInfo = async (item: any) => {
      try {
        const responseName = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyApNQIsZHkXaKE-ExwqwJaN6XXVPzT3jVE&q=${encodeURIComponent(
            item.item_name,
          )}&target=${encodeURIComponent(targetLanguage)}`,
        );
        const dateName = await responseName.json();
        const name = dateName.data.translations[0].translatedText;

        return { ...item, item_name: name };
      } catch (err) {
        console.error('Translation error:', err);
        return item;
      }
    };

    const translateItems = async () => {
      const translatedItem = await Promise.all(
        items.map((item) => translateItemInfo(item)),
      );

      setTranslationItems(translatedItem);
    };

    translateItems();
  }, []);

  const onChange = (e: any) => {
    dispatch({
      type: 'item/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {itemType.map((data) => (
            <Radio value={data.key} key={`item-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {translatedItems
          .filter((item) => filterKey === 0 || item.item_type === filterKey)
          .reverse()
          .map((item) => (
            <Col className={styles.itemStyle} key={item.item_id} span={3}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`}
              />
              <p>{item.item_name}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};

const mapTopProps = ({ item }: { item: ItemModelState }) => ({ item });

export default connect(mapTopProps)(Item);
