import classNames from 'classnames';
import { useEffect, useState } from 'react';

import styles from './VideoPlayer.module.css';

export default function VideoPlayer() {
  const [scripthtml, setScripthtml] = useState('');
  useEffect(() => {
    const dataUrl = window.location.href;
    fetch(
      '//js.espanplay.site/get_player?type=replace&r_domain=&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=' +
        dataUrl,
    )
      .then(res => res.text())
      .then(data => {
        if (
          data?.match(/<iframe.*<\/iframe>/gm) !== null &&
          data?.match(/<iframe.*<\/iframe>/gm)?.length
        ) {
          setScripthtml(data?.match(/<iframe.*<\/iframe>/gm)![0]);
        }
      });
  }, []);
  return (
    <div
      className={classNames('uitools', styles.video)}
      id="videplayers"
      dangerouslySetInnerHTML={{ __html: scripthtml }}
    ></div>
  );
}
