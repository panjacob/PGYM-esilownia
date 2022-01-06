import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function TrainingJitsi(props) {
    const [groupId, setGroupId] = useState("")
    const [trainingInfo, setTrainingInfo] = useState([])
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')

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
            .post(`training/get`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingInfo(res.data)
                setDateStart(res.data.date_start)
                setDateEnd(res.data.date_end)
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
        window.mobileCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        const width = (window.mobileCheck()) ? 300 : 1100;
        const height = (window.mobileCheck()) ? 500 : 700;

        document.getElementById("meet").innerHTML = "";
        //const search = location.search;
        //const id = new URLSearchParams(search).get('id');
        //const roomName = id;
        const domain = "meet.pgym.xyz";
        const configOverwrite = (moderator) ? jitsiConfigModerator() : jitsiConfigUser();
        const options = {
            width: width,
            height: height,
            parentNode: document.querySelector('#meet'),
            roomName: roomName,
            jwt: jwt,
            configOverwrite: configOverwrite
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.on('readyToClose', () => {
            api.dispose();
        });
    };

    const jitsiGetToken = (e) => {

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`/training/join`, {id: id}, {
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
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">{trainingInfo.title}
                    </h1>
                    <hr></hr>
                </div>
                <div className="container mt-4 pl-0 border" style={{'width':'1100px', 'height':'700px'}} >
                    <div id='meet'></div>
                </div>
                <div className="card mb-4 mt-4 bg-light" width="100%">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-5">
                                <h6 className="mb-0">Opis</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                                {trainingInfo.description}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-5">
                                <h6 className="mb-0">Czas Trwania</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                                {dateStart.replace('T',' ').replace('Z','')}  -  {dateEnd.replace('T',' ').replace('Z','')}
                            </div>
                        </div>
                        <hr/>

                        <div className='text-left mb-2'>
                            <Link className='btn'
                                  to={{
                                      pathname: '/zgłoszenia',
                                  }}
                            >Zgłoś</Link>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default TrainingJitsi;