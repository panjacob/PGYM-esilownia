import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function DietMeetingJitsi(props) {
    const [groupId, setGroupId] = useState("")
    const [meetingInfo, setMeetingInfo] = useState([])
    const [meetingDate, setMeetingDate] = useState("")
    const [participantsInfo, setParticipantsInfo] = useState([])

    const location = useLocation()

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://meet.pgym.xyz/external_api.js";
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
            jitsiGetToken();
        };

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        setGroupId(id)

        axiosInstance
            .post(`diet/meeting/get`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setMeetingDate(res.data.date)
                setMeetingInfo(res.data)
            });

    }, [props.groupId]);

    const jitsiConfigUser = () => {
        let config = {
            disableReactions: true,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            disableInitialGUM: true,
            disableProfile: true,
            readOnlyName: true,
            disableThirdPartyRequests: true,
            disabledSounds: ['RECORDING_OFF_SOUND', 'RECORDING_ON_SOUND'],
            disableInviteFunctions: true,
            disableTileView: true,
            hideConferenceSubject: true,
            hideConferenceTimer: true,
            hideRecordingLabel: true,
            toolbarButtons: [
                'camera',
                'chat',
                //    'closedcaptions',
                //    'desktop',
                //    'download',
                //    'embedmeeting',
                //    'etherpad',
                //    'feedback',
                //    'filmstrip',
                'fullscreen',
                'hangup',
                //    'help',
                //    'invite',
                //    'livestreaming',
                'microphone',
                //    'mute-everyone',
                //    'mute-video-everyone',
                'participants-pane',
                //    'profile',
                'raisehand',
                //    'recording',
                //    'security',
                //    'select-background',
                'settings',
                'shareaudio',
                'sharedvideo',
                //    'shortcuts',
                //    'stats',
                //    'tileview',
                'toggle-camera',
                //    'videoquality',
                '__end'
            ],
            notifications: [
                'connection.CONNFAIL', // shown when the connection fails,
                'dialog.cameraNotSendingData', // shown when there's no feed from user's camera
                'dialog.kickTitle', // shown when user has been kicked
                //     'dialog.liveStreaming', // livestreaming notifications (pending, on, off, limits)
                //     'dialog.lockTitle', // shown when setting conference password fails
                'dialog.maxUsersLimitReached', // shown when maximmum users limit has been reached
                'dialog.micNotSendingData', // shown when user's mic is not sending any audio
                //     'dialog.passwordNotSupportedTitle', // shown when setting conference password fails due to password format
                //     'dialog.recording', // recording notifications (pending, on, off, limits)
                //     'dialog.remoteControlTitle', // remote control notifications (allowed, denied, start, stop, error)
                //     'dialog.reservationError',
                'dialog.serviceUnavailable', // shown when server is not reachable
                'dialog.sessTerminated', // shown when there is a failed conference session
                'dialog.sessionRestarted', // show when a client reload is initiated because of bridge migration
                'dialog.tokenAuthFailed', // show when an invalid jwt is used
                //     'dialog.transcribing', // transcribing notifications (pending, off)
                //     'dialOut.statusMessage', // shown when dial out status is updated.
                //     'liveStreaming.busy', // shown when livestreaming service is busy
                //     'liveStreaming.failedToStart', // shown when livestreaming fails to start
                //     'liveStreaming.unavailableTitle', // shown when livestreaming service is not reachable
                //     'lobby.joinRejectedMessage', // shown when while in a lobby, user's request to join is rejected
                //     'lobby.notificationTitle', // shown when lobby is toggled and when join requests are allowed / denied
                //     'localRecording.localRecording', // shown when a local recording is started
                'notify.chatMessages', // shown when receiving chat messages while the chat window is closed
                'notify.disconnected', // shown when a participant has left
                'notify.connectedOneMember', // show when a participant joined
                'notify.connectedTwoMembers', // show when two participants joined simultaneously
                'notify.connectedThreePlusMembers', // show when more than 2 participants joined simultaneously
                'notify.leftOneMember', // show when a participant left
                'notify.leftTwoMembers', // show when two participants left simultaneously
                'notify.leftThreePlusMembers', // show when more than 2 participants left simultaneously
                'notify.grantedTo', // shown when moderator rights were granted to a participant
                //     'notify.invitedOneMember', // shown when 1 participant has been invited
                //     'notify.invitedThreePlusMembers', // shown when 3+ participants have been invited
                //     'notify.invitedTwoMembers', // shown when 2 participants have been invited
                'notify.kickParticipant', // shown when a participant is kicked
                'notify.moderationStartedTitle', // shown when AV moderation is activated
                'notify.moderationStoppedTitle', // shown when AV moderation is deactivated
                'notify.moderationInEffectTitle', // shown when user attempts to unmute audio during AV moderation
                'notify.moderationInEffectVideoTitle', // shown when user attempts to enable video during AV moderation
                'notify.moderationInEffectCSTitle', // shown when user attempts to share content during AV moderation
                'notify.mutedRemotelyTitle', // shown when user is muted by a remote party
                'notify.mutedTitle', // shown when user has been muted upon joining,
                'notify.newDeviceAudioTitle', // prompts the user to use a newly detected audio device
                'notify.newDeviceCameraTitle', // prompts the user to use a newly detected camera
                //     'notify.passwordRemovedRemotely', // shown when a password has been removed remotely
                //     'notify.passwordSetRemotely', // shown when a password has been set remotely
                'notify.raisedHand', // shown when a partcipant used raise hand,
                'notify.startSilentTitle', // shown when user joined with no audio
                'notify.unmute', // shown to moderator when user raises hand during AV moderation
                'prejoin.errorDialOut',
                'prejoin.errorDialOutDisconnected',
                'prejoin.errorDialOutFailed',
                'prejoin.errorDialOutStatus',
                'prejoin.errorStatusCode',
                'prejoin.errorValidation',
                //     'recording.busy', // shown when recording service is busy
                //     'recording.failedToStart', // shown when recording fails to start
                //     'recording.unavailableTitle', // shown when recording service is not reachable
                'toolbar.noAudioSignalTitle', // shown when a broken mic is detected
                'toolbar.noisyAudioInputTitle', // shown when noise is detected for the current microphone
                'toolbar.talkWhileMutedPopup', // shown when user tries to speak while muted
                'transcribing.failedToStart', // shown when transcribing fails to start
                'deviceError.microphoneError'
            ]
        };
        return config;
    }

    const jitsiConfigModerator = () => {
        let config = {
            disableReactions: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableProfile: true,
            readOnlyName: true,
            disableThirdPartyRequests: true,
            disabledSounds: ['RECORDING_OFF_SOUND', 'RECORDING_ON_SOUND'],
            disableInviteFunctions: true,
            disableTileView: true,
            hideConferenceSubject: true,
            hideConferenceTimer: true,
            hideRecordingLabel: true,
            notifications: [
                'connection.CONNFAIL', // shown when the connection fails,
                'dialog.cameraNotSendingData', // shown when there's no feed from user's camera
                'dialog.kickTitle', // shown when user has been kicked
                //     'dialog.liveStreaming', // livestreaming notifications (pending, on, off, limits)
                //     'dialog.lockTitle', // shown when setting conference password fails
                'dialog.maxUsersLimitReached', // shown when maximmum users limit has been reached
                'dialog.micNotSendingData', // shown when user's mic is not sending any audio
                //     'dialog.passwordNotSupportedTitle', // shown when setting conference password fails due to password format
                //     'dialog.recording', // recording notifications (pending, on, off, limits)
                //     'dialog.remoteControlTitle', // remote control notifications (allowed, denied, start, stop, error)
                //     'dialog.reservationError',
                'dialog.serviceUnavailable', // shown when server is not reachable
                'dialog.sessTerminated', // shown when there is a failed conference session
                'dialog.sessionRestarted', // show when a client reload is initiated because of bridge migration
                'dialog.tokenAuthFailed', // show when an invalid jwt is used
                //     'dialog.transcribing', // transcribing notifications (pending, off)
                //     'dialOut.statusMessage', // shown when dial out status is updated.
                //     'liveStreaming.busy', // shown when livestreaming service is busy
                //     'liveStreaming.failedToStart', // shown when livestreaming fails to start
                //     'liveStreaming.unavailableTitle', // shown when livestreaming service is not reachable
                //     'lobby.joinRejectedMessage', // shown when while in a lobby, user's request to join is rejected
                //     'lobby.notificationTitle', // shown when lobby is toggled and when join requests are allowed / denied
                //     'localRecording.localRecording', // shown when a local recording is started
                'notify.chatMessages', // shown when receiving chat messages while the chat window is closed
                'notify.disconnected', // shown when a participant has left
                'notify.connectedOneMember', // show when a participant joined
                'notify.connectedTwoMembers', // show when two participants joined simultaneously
                'notify.connectedThreePlusMembers', // show when more than 2 participants joined simultaneously
                'notify.leftOneMember', // show when a participant left
                'notify.leftTwoMembers', // show when two participants left simultaneously
                'notify.leftThreePlusMembers', // show when more than 2 participants left simultaneously
                'notify.grantedTo', // shown when moderator rights were granted to a participant
                //     'notify.invitedOneMember', // shown when 1 participant has been invited
                //     'notify.invitedThreePlusMembers', // shown when 3+ participants have been invited
                //     'notify.invitedTwoMembers', // shown when 2 participants have been invited
                'notify.kickParticipant', // shown when a participant is kicked
                'notify.moderationStartedTitle', // shown when AV moderation is activated
                'notify.moderationStoppedTitle', // shown when AV moderation is deactivated
                'notify.moderationInEffectTitle', // shown when user attempts to unmute audio during AV moderation
                'notify.moderationInEffectVideoTitle', // shown when user attempts to enable video during AV moderation
                'notify.moderationInEffectCSTitle', // shown when user attempts to share content during AV moderation
                'notify.mutedRemotelyTitle', // shown when user is muted by a remote party
                'notify.mutedTitle', // shown when user has been muted upon joining,
                'notify.newDeviceAudioTitle', // prompts the user to use a newly detected audio device
                'notify.newDeviceCameraTitle', // prompts the user to use a newly detected camera
                //     'notify.passwordRemovedRemotely', // shown when a password has been removed remotely
                //     'notify.passwordSetRemotely', // shown when a password has been set remotely
                'notify.raisedHand', // shown when a partcipant used raise hand,
                'notify.startSilentTitle', // shown when user joined with no audio
                'notify.unmute', // shown to moderator when user raises hand during AV moderation
                'prejoin.errorDialOut',
                'prejoin.errorDialOutDisconnected',
                'prejoin.errorDialOutFailed',
                'prejoin.errorDialOutStatus',
                'prejoin.errorStatusCode',
                'prejoin.errorValidation',
                //     'recording.busy', // shown when recording service is busy
                //     'recording.failedToStart', // shown when recording fails to start
                //     'recording.unavailableTitle', // shown when recording service is not reachable
                'toolbar.noAudioSignalTitle', // shown when a broken mic is detected
                'toolbar.noisyAudioInputTitle', // shown when noise is detected for the current microphone
                'toolbar.talkWhileMutedPopup', // shown when user tries to speak while muted
                'transcribing.failedToStart', // shown when transcribing fails to start
                'deviceError.microphoneError'
            ]
        };
        return config;
    }

    const jitsiStart = (jwt, roomName, moderator) => {
        document.getElementById("meet").innerHTML = "";
        //const search = location.search;
        //const id = new URLSearchParams(search).get('id');
        //const roomName = id;
        const domain = "meet.pgym.xyz";
        const configOverwrite = (moderator) ? jitsiConfigModerator() : jitsiConfigUser();
        const options = {
            width: 1100,
            height: 700,
            parentNode: document.querySelector('#meet'),
            roomName: roomName,
            jwt: jwt,
            configOverwrite: configOverwrite
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        setParticipantsInfo([])
        setParticipantsInfo(api.getParticipantsInfo())
        api.on('readyToClose', () => {
            api.dispose();
        });
    };

    const jitsiGetToken = (e) => {
        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`diet/jitsi/join`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                jitsiStart(res.data.token, res.data.roomName, res.data.moderator);
            });
    }

    return (
        <div className="treningJitsi justify-content-center">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">{meetingInfo.title}
                    </h1>
                    <hr></hr>
                </div>
                <div className="container mt-4 border pl-0" style={{'width':'1100px', 'height':'700px'}}>
                    <div id='meet'></div>
                </div>
                <div className="card mb-4 mt-4 bg-light" width="100%">
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <div className="col-sm-5">
                                <h6 className="mb-0">Start</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                                {meetingDate.replace("T", " ").replace("Z", " ")}
                            </div>
                        </div>
                        <hr/>
                    </div>

                </div>
                <div className="card mb-4 mt-4 bg-light" width="100%">
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <div className="col-sm-5">
                                <h6 className="mb-0">Użytkownicy</h6>
                            </div>
                            <div className="col-sm-7 text-secondary" style={{minHeight:'400px'}}>
                                {participantsInfo.map(function (participant, idx){
                                    return(
                                        <p>participant.email</p>
                                    )

                                })}
                            </div>
                        </div>
                        <hr/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DietMeetingJitsi;