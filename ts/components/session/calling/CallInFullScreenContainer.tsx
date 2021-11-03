import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useKey from 'react-use/lib/useKey';
import styled from 'styled-components';
import { useVideoCallEventsListener } from '../../../hooks/useVideoEventListener';
import { setFullScreenCall } from '../../../state/ducks/conversations';
import {
  getCallIsInFullScreen,
  getHasOngoingCallWithFocusedConvo,
} from '../../../state/selectors/conversations';
import { StyledVideoElement } from './DraggableCallContainer';

const CallInFullScreenVisible = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: black;
  border: var(--session-border);
  opacity: 1;
`;

export const CallInFullScreenContainer = () => {
  const dispatch = useDispatch();
  const ongoingCallWithFocused = useSelector(getHasOngoingCallWithFocusedConvo);
  const hasOngoingCallFullScreen = useSelector(getCallIsInFullScreen);

  const { remoteStream, remoteStreamVideoIsMuted } = useVideoCallEventsListener(
    'CallInFullScreenContainer',
    true
  );

  const videoRefRemote = React.useRef<HTMLVideoElement>(null);

  function toggleFullScreenOFF() {
    dispatch(setFullScreenCall(false));
  }

  useKey('Escape', () => {
    toggleFullScreenOFF();
  });

  useEffect(() => {
    // close fullscreen mode if the remote video gets muted
    if (remoteStreamVideoIsMuted) {
      dispatch(setFullScreenCall(false));
    }
  }, [remoteStreamVideoIsMuted]);

  if (!ongoingCallWithFocused || !hasOngoingCallFullScreen) {
    return null;
  }

  if (videoRefRemote?.current) {
    videoRefRemote.current.srcObject = remoteStream;
  }

  return (
    <CallInFullScreenVisible onClick={toggleFullScreenOFF}>
      <StyledVideoElement
        ref={videoRefRemote}
        autoPlay={true}
        isVideoMuted={remoteStreamVideoIsMuted}
      />
    </CallInFullScreenVisible>
  );
};
