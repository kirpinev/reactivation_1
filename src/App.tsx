import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import ruble from "./assets/ruble.png";
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
            ? "Попади монеткой в пазл и заработай приз"
            : "Поздравляем, вы выиграли приз!"}
        </Typography.TitleResponsive>

        <Gap size={24} />

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
              setIsStopDragging(true);
              const rubleLeft =
                rubleRef.current?.getBoundingClientRect().left || 0;

              if (
                rubleLeft + 6 ===
                targetRef.current?.getBoundingClientRect().left
              ) {
                setSuccess(true);
              } else {
                setError(true);
              }
            }}
          />
        </div>

        <Gap size={40} />

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
              Приз!
            </Typography.Text>
            <Typography.Text weight="regular" view="primary-medium">
              До 80% кэшбэка в Яндекс.Маркете
            </Typography.Text>
          </>
        )}
      </div>

      <div className={appSt.bottomBtnThx}>
        {success && (
          <ButtonMobile block view="primary" href="">
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
