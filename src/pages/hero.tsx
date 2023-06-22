import React, { FC, useEffect, useState } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps, Dispatch } from 'umi';
import { Row, Col, Radio, Card } from 'antd';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  dispatch: Dispatch;
}

const RadioGroup = Radio.Group;
const heroType = [
  { key: 0, value: 'All' },
  { key: 1, value: 'Warrior' },
  { key: 2, value: 'Mage' },
  { key: 3, value: 'Tank' },
  { key: 4, value: 'Assassin' },
  { key: 5, value: 'Marksman' },
  { key: 6, value: 'Support' },
];

const Hero: FC<PageProps> = ({ hero, dispatch }) => {
  const { heros = [], filterKey = 0, freeheros = [] } = hero;

  const [translatedHeros, setTranslatedHeros] = useState<any>(heros);
  const [translatedFreeHeros, setTranslatedFreeHeros] =
    useState<any>(freeheros);

  useEffect(() => {
    const targetLanguage = 'en'; // English

    const translateHeroInfo = async (item: any) => {
      try {
        const responseCname = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyApNQIsZHkXaKE-ExwqwJaN6XXVPzT3jVE&q=${encodeURIComponent(
            item.cname,
          )}&target=${encodeURIComponent(targetLanguage)}`,
        );
        const dataCname = await responseCname.json();
        const heroCname = dataCname.data.translations[0].translatedText;

        const responseTitle = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyApNQIsZHkXaKE-ExwqwJaN6XXVPzT3jVE&q=${encodeURIComponent(
            item.title,
          )}&target=${encodeURIComponent(targetLanguage)}`,
        );
        const dataTitle = await responseTitle.json();
        const heroTitle = dataTitle.data.translations[0].translatedText;

        return { ...item, cname: heroCname, title: heroTitle };
      } catch (err) {
        console.error('Translation error:', err);
        return item;
      }
    };

    const translateHeros = async () => {
      const translatedHeros = await Promise.all(
        heros.map((item) => translateHeroInfo(item)),
      );

      const translatedFreeHeros = await Promise.all(
        freeheros.map((item) => translateHeroInfo(item)),
      );

      setTranslatedHeros(translatedHeros);
      setTranslatedFreeHeros(translatedFreeHeros);
    };

    translateHeros();
  }, []);

  const onChange = (e: any) => {
    dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div className={styles.normal}>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>

      <Row>
        {translatedHeros
          .filter((item) => filterKey === 0 || item.hero_type === filterKey)
          .reverse()
          .map((item) => (
            <Col className={styles.heroitem} key={item.ename} span={3}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              />
              <p>{item.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};

const mapPropsTopage = ({ hero }: { hero: HeroModelState }) => ({ hero });
export default connect(mapPropsTopage)(Hero);
