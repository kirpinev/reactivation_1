import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import ruble from "./assets/ruble.png";
import read1 from "./assets/read1.jpeg";
import read2 from "./assets/read2.jpg";
import read3 from "./assets/read3.png";
import { appSt } from "./style.css";

import { useRef, useState } from "react";
import { Slider } from "@alfalab/core-components/slider";
import { Gap } from "@alfalab/core-components/gap";

export const App = () => {
  const [isStopDragging, setIsStopDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const rubleRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

    const clickSuccess = () => {
        window.gtag("event", "prize_page_view", {
          variant_name: "reactivation_1",
        });
    };

    const clickSubmit = () => {
        window.gtag("event", "prize_get_click", {
            variant_name: "reactivation_1",
        });
    };

    const clickInteraction = () => {
        window.gtag("event", "game_interaction", {
            variant_name: "reactivation_1",
        });
    };

  return (
    <>
      <Gap size={48} />
      <div className={appSt.container}>
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="small"
          weight="semibold"
          className={appSt.productsTitle}
        >
          {!success
            ? "Соедините монетки и получите приз"
            : "Поздравляем, вы выиграли приз!"}
        </Typography.TitleResponsive>

        <Gap size={40} />

        <div
          style={{
            height: "70px",
            width: "100%",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderRadius: "16px",
          }}
        >
          <img
            src={ruble}
            alt=""
            height="65"
            ref={rubleRef}
            style={{
              position: "absolute",
              left: Number(startPosition),
              top: 2,
              zIndex: 2,
            }}
          />
          <img
            src={ruble}
            alt=""
            height="65"
            style={{
              position: "absolute",
              right: 51,
              top: 2,
              zIndex: 1,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              height: "56px",
              width: "56px",
              backgroundColor: "white",
              borderRadius: "100%",
              marginRight: "50px",
              position: "absolute",
              right: 5,
              top: 7,
            }}
            ref={targetRef}
          ></div>
        </div>

        <Gap size={48} />

        <div className={appSt.wrapper}>
          <Slider
            size="m"
            disabled={isStopDragging}
            value={Number(startPosition)}
            range={{
              min: 0,
              max:
                (targetRef.current?.getBoundingClientRect().left || 0) + 30 ||
                0,
            }}
            onChange={(event) => setStartPosition(event.value)}
            onEnd={() => {
              clickInteraction();
              setIsStopDragging(true);
              const rubleLeft =
                rubleRef.current?.getBoundingClientRect().left || 0;
              const rubleRight =
                rubleRef.current?.getBoundingClientRect().right || 0;

              const targetLeft =
                targetRef.current?.getBoundingClientRect().left || 0;
              const targetRight =
                targetRef.current?.getBoundingClientRect().right || 0;


              if (
                rubleLeft + 6 ===
                targetRef.current?.getBoundingClientRect().left
              ) {
                setSuccess(true);
                clickSuccess();
              } else if (
                rubleRight - 6 < targetRight &&
                Math.abs(rubleRight - 6 - targetRight) <= 10
              ) {
                setSuccess(true);
                clickSuccess();
              } else if (
                rubleLeft + 6 > targetLeft &&
                Math.abs(rubleLeft - targetLeft) <= 6
              ) {
                setSuccess(true);
                clickSuccess();
              } else {
                setError(true);
              }
            }}
          />
        </div>

        <Gap size={64} />

        {error && (
          <div style={{ textAlign: "center" }}>
            <Typography.Text
              weight="regular"
              color="negative"
              view="primary-large"
            >
              Близко, но не совсем точно. Попробуйте еще раз!
            </Typography.Text>
          </div>
        )}

        {success && (
          <>
            <Typography.Text weight="bold" view="primary-large">
              Кэшбэк у партнёров
            </Typography.Text>
            <Gap size={24} />
            <div className={appSt.gifts}>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img src={read3} alt="" className={appSt.giftImage} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Литрес
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    20%
                  </Typography.Text>
                </div>
              </div>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img src={read1} alt="" className={appSt.giftImage} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Читай Город
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    10%
                  </Typography.Text>
                </div>
              </div>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img src={read2} alt="" className={appSt.giftImage} style={ { transform: "scale(1.1)" } } />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Буквоед
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    10%
                  </Typography.Text>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtnThx}>
        {success && (
          <ButtonMobile block view="primary" href="https://alfa.me/cbpartner" onClick={clickSubmit}>
            Забрать приз
          </ButtonMobile>
        )}
        {error && (
          <ButtonMobile
            block
            view="primary"
            onClick={() => {
              setError(false);
              setStartPosition(0);
              setIsStopDragging(false);
            }}
          >
            Сыграть еще
          </ButtonMobile>
        )}
      </div>
    </>
  );
};
