import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import Button from "./Button";
import SmallButton from "./SmallButton";
import { ReactComponent as RecordIcon } from "../../icons/record.svg";
import { ReactComponent as StopIcon } from "../../icons/stop.svg";
import { ReactComponent as DownloadIcon } from "../../icons/download.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #faf9f8;
  padding: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const StyledVideo = styled.video`
  height: 20rem;
  border-radius: 3px;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const StyledSelect = styled.select`
  height: 2rem;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 10rem;
  box-sizing: content-box;

  option {
    font-size: 0.8rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0.2rem 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`;

interface CameraProps {
  onMediaReady: () => void;
}

function Camera({ onMediaReady }: CameraProps) {
  const myVideo = useRef<HTMLVideoElement>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  // let mediaRecorder: MediaRecorder | null = null;
  const [status, setStatus] = useState<string>("");
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | undefined>(
    undefined
  );
  const [devices, setDevices] = useState<{
    cameras: InputDeviceInfo[];
    mics: InputDeviceInfo[];
  }>();
  // const [cameraDevices, setCameraDevices] = useState<InputDeviceInfo[]>([]);
  // const [micDevices, setMicDevices] = useState<InputDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<{
    cameraId: string | undefined;
    micId: string | undefined;
  }>();

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const mics = devices.filter((device) => device.kind === "audioinput");
      setDevices({ cameras, mics });

      if (mediaStream.current) {
        const cameraId = await mediaStream.current
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const micId = await mediaStream.current
          .getAudioTracks()[0]
          .getSettings().deviceId;

        setSelectedDevice({ cameraId, micId });
      }

      console.log(cameras);
      console.log(mics);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserMediaStream = useCallback(
    async (cameraId?: string, micId?: string) => {
      setStatus("get media");
      const initConstraints = { audio: true, video: true };
      const exactConstraints = {
        audio: { deviceId: micId },
        video: { deviceId: cameraId },
      };

      try {
        if (!myVideo.current) {
          return;
        }
        // 카메라 입력 출력
        const stream = await navigator.mediaDevices.getUserMedia(
          cameraId ? exactConstraints : initConstraints
        );
        myVideo.current.srcObject = stream;
        myVideo.current.muted = true;
        myVideo.current.onloadedmetadata = () => myVideo.current?.play();

        mediaStream.current = stream;
        getDevices();
        onMediaReady();
        setStatus("idle");
      } catch (error) {
        console.log(error);
        setStatus("idle");
      }
    },
    []
  );

  const onClickRecordStartButton = async () => {
    if (!mediaStream.current) {
      await getUserMediaStream();
    }

    if (!mediaStream.current?.active) {
      return;
    }
    let mediaData: any[] = [];
    mediaRecorder.current = new MediaRecorder(mediaStream.current, {
      mimeType: "video/webm;codecs=vp9",
    });

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        mediaData.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(mediaData, { type: "video/webm;codecs=vp9" });
      const recordedMediaUrl = URL.createObjectURL(blob);
      setStatus("recording stopped");
      setMediaBlobUrl(recordedMediaUrl);
    };

    mediaRecorder.current.onerror = () => {
      console.log("error");
      alert("에러!");
      setStatus("idle");
    };

    mediaRecorder.current.start();
    setStatus("recording");
  };

  const onClickRecordStopButton = () => {
    if (mediaRecorder) {
      mediaRecorder.current?.stop();
      mediaRecorder.current = null;
    }
  };

  const onClickDownloadButton = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = mediaBlobUrl;
      a.download = "video/webm";
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(mediaBlobUrl);
      setMediaBlobUrl(undefined);
    }
  };

  const onChangeCamera = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    mediaStream.current?.getVideoTracks().forEach((track) => track.stop());
    setSelectedDevice((prev) => ({
      cameraId: event.target.value,
      micId: prev?.micId,
    }));
    await getUserMediaStream(event.target.value, selectedDevice?.micId);
  };

  const onChangeMic = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    mediaStream.current?.getVideoTracks().forEach((track) => track.stop());
    setSelectedDevice((prev) => ({
      cameraId: prev?.cameraId,
      micId: event.target.value,
    }));
    await getUserMediaStream(selectedDevice?.cameraId, event.target.value);
  };

  useEffect(() => {
    if (!MediaRecorder) {
      throw new Error("브라우저 미지원");
    }
    if (!mediaStream.current) {
      getUserMediaStream();
    }
  }, [getUserMediaStream]);

  // 카메라 종료
  useLayoutEffect(() => {
    return () => {
      if (mediaStream.current) {
        const tracks = mediaStream.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <Container>
      <StyledVideo ref={myVideo} />
      <ButtonContainer>
        {mediaBlobUrl && (
          <SmallButton
            width="5rem"
            label="저장"
            onClick={onClickDownloadButton}
          >
            <DownloadIcon width="1.2rem" height="1.2rem" fill="#eee" />
          </SmallButton>
        )}
        {status === "recording" ? (
          <SmallButton
            width="5rem"
            label="중지"
            onClick={onClickRecordStopButton}
          >
            <StopIcon width="1rem" height="1rem" fill="#eee" />
          </SmallButton>
        ) : (
          <>
            <SmallButton
              width="5rem"
              label="녹화"
              onClick={onClickRecordStartButton}
            >
              <RecordIcon width="1.6rem" height="1.6rem" fill="#f13636" />
            </SmallButton>

            <SelectContainer>
              <StyledSelect
                name="cameras"
                id="cameraSelect"
                onChange={onChangeCamera}
              >
                {devices?.cameras.map((camera) => (
                  <option value={camera.deviceId} key={camera.deviceId}>
                    {camera.label}
                  </option>
                ))}
              </StyledSelect>
              <StyledSelect name="mics" id="micSelect" onChange={onChangeMic}>
                {devices?.mics.map((mic) => (
                  <option value={mic.deviceId} key={mic.deviceId}>
                    {mic.label}
                  </option>
                ))}
              </StyledSelect>
            </SelectContainer>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default Camera;
