import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { connect, HeroModelState, ConnectProps, Dispatch } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { Button } from '@mui/material';

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

const Index: FC<PageProps> = ({ hero, dispatch }) => {
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
    <div
      className={styles.normal}
      style={{ cursor: 'pointer' }}
      onClick={() => (location.href = '/hero')}
    />
  );
};

const mapPropsTopage = ({ hero }: { hero: HeroModelState }) => ({ hero });
export default connect(mapPropsTopage)(Index);
