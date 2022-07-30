import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import Button from "./Button";
import { ReactComponent as RecordIcon } from "../../icons/record.svg";
import { ReactComponent as StopIcon } from "../../icons/stop.svg";
import { ReactComponent as DownloadIcon } from "../../icons/download.svg";

const Container = styled.div`
  display: flex;
  width: 40rem;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #faf9f8;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledVideo = styled.video`
  width: 33rem;
  border-radius: 3px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface CameraProps {
  onMediaReady: () => void;
}

function Camera({ onMediaReady }: CameraProps) {
  const myVideo = useRef<HTMLVideoElement>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  // let mediaRecorder: MediaRecorder | null = null;
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | undefined>(
    undefined
  );

  const [status, setStatus] = useState<string>("");

  const getUserMediaStream = useCallback(async () => {
    setStatus("get media");
    const constraints = { audio: true, video: true };
    try {
      if (!myVideo.current) {
        return;
      }
      // 카메라 입력 출력
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      myVideo.current.srcObject = stream;
      myVideo.current.muted = true;
      myVideo.current.onloadedmetadata = () => myVideo.current?.play();

      mediaStream.current = stream;
      onMediaReady();
      setStatus("idle");
    } catch (error) {
      console.log(error);
      setStatus("idle");
    }
  }, []);

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
      <StyledVideo ref={myVideo}></StyledVideo>
      <ButtonContainer>
        {status === "recording" ? (
          <Button width="6rem" label="중지" onClick={onClickRecordStopButton}>
            <StopIcon width="1rem" height="1rem" fill="#eee" />
          </Button>
        ) : (
          <Button width="6rem" label="녹화" onClick={onClickRecordStartButton}>
            <RecordIcon width="1.6rem" height="1.6rem" fill="#f13636" />
          </Button>
        )}
        {mediaBlobUrl && (
          <Button width="6rem" label="저장" onClick={onClickDownloadButton}>
            <DownloadIcon width="1.2rem" height="1.2rem" fill="#eee" />
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default Camera;
