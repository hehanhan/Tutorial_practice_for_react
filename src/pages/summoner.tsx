import React, { FC, useEffect, useState } from 'react';
import styles from './summoner.less';
import { SummonerModelState, connect, ConnectProps } from 'umi';
import { Row, Col } from 'antd';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}

const Summoner: FC<PageProps> = (props) => {
  const { summoners = [] } = props.summoner;

  const [translatedSummoners, setTranslatedSummoners] =
    useState<any>(summoners);

  useEffect(() => {
    const targetLanguage = 'en'; // English

    const translatedSummoners = async (item: any) => {
      try {
        const responseSummerName = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyApNQIsZHkXaKE-ExwqwJaN6XXVPzT3jVE&q=${encodeURIComponent(
            item.summoner_name,
          )}&target=${encodeURIComponent(targetLanguage)}`,
        );
        const dataSummonerName = await responseSummerName.json();
        const summonerName =
          dataSummonerName.data.translations[0].translatedText;

        return { ...item, summoner_name: summonerName };
      } catch (err) {
        console.error('Translation error:', err);
        return item;
      }
    };

    const translateHeros = async () => {
      const translatedSummoner = await Promise.all(
        summoners.map((item) => translatedSummoners(item)),
      );

      setTranslatedSummoners(translatedSummoner);
    };

    translateHeros();
  }, []);

  console.log();
  return (
    <div>
      <Row>
        {translatedSummoners.reverse().map((item) => (
          <Col className={styles.summonerStyle} key={item.summoner_id} span={3}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`}
            />
            <p>{item.summoner_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const mapTopProps = ({ summoner }: { summoner: SummonerModelState }) => ({
  summoner,
});

export default connect(mapTopProps)(Summoner);
