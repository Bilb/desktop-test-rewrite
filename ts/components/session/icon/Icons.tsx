export enum SessionIconType {
  AddUser = 'addUser',
  Arrow = 'arrow',
  Caret = 'caret',
  ChatBubble = 'chatBubble',
  Check = 'check',
  Chevron = 'chevron',
  CircleCheck = 'circleCheck',
  CircleCheckFilled = 'circleCheckFilled',
  CirclePlus = 'circlePlus',
  CircleElipses = 'circleElipses',
  Contacts = 'contacts',
  Ellipses = 'ellipses',
  Emoji = 'emoji',
  Error = 'error',
  Eye = 'eye',
  Exit = 'exit',
  File = 'file',
  Gear = 'gear',
  Globe = 'globe',
  Info = 'info',
  Lock = 'lock',
  Microphone = 'microphone',
  Moon = 'moon',
  Reply = 'reply',
  Search = 'search',
  Send = 'send',
  Star = 'star',
  QR = 'qr',
  Users = 'users',
  Upload = 'upload',
  Warning = 'warning',
}

export enum SessionIconSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const icons = {
  [SessionIconType.AddUser]: {
    path:
      'M8.85,2.17c-1.73,0-3.12,1.4-3.12,3.12s1.4,3.12,3.12,3.12c1.73,0,3.13-1.4,3.13-3.12S10.58,2.17,8.85,2.17z M8.85,0.08c2.88,0,5.21,2.33,5.21,5.21s-2.33,5.21-5.21,5.21s-5.2-2.33-5.2-5.21C3.65,2.42,5.98,0.08,8.85,0.08z M20.83,5.29 c0.54,0,0.98,0.41,1.04,0.93l0.01,0.11v2.08h2.08c0.54,0,0.98,0.41,1.04,0.93v0.12c0,0.54-0.41,0.98-0.93,1.04l-0.11,0.01h-2.08 v2.08c0,0.58-0.47,1.04-1.04,1.04c-0.54,0-0.98-0.41-1.04-0.93l-0.01-0.11v-2.08h-2.08c-0.54,0-0.98-0.41-1.04-0.93l-0.01-0.11 c0-0.54,0.41-0.98,0.93-1.04l0.11-0.01h2.08V6.34C19.79,5.76,20.26,5.29,20.83,5.29z M12.5,12.58c2.8,0,5.09,2.21,5.2,4.99v0.22 v2.08c0,0.58-0.47,1.04-1.04,1.04c-0.54,0-0.98-0.41-1.04-0.93l-0.01-0.11v-2.08c0-1.67-1.3-3.03-2.95-3.12h-0.18H5.21 c-1.67,0-3.03,1.3-3.12,2.95v0.18v2.08c0,0.58-0.47,1.04-1.04,1.04c-0.54,0-0.98-0.41-1.04-0.93L0,19.88V17.8 c0-2.8,2.21-5.09,4.99-5.2h0.22h7.29V12.58z',
    viewBox: '0 0 25 21',
  },
  [SessionIconType.Arrow]: {
    path:
      'M33.187,12.438 L6.097,12.438 L16.113,2.608 C16.704,2.027 16.713,1.078 16.133,0.486 C15.551,-0.105 14.602,-0.113 14.011,0.466 L1.407,12.836 C1.121,13.117 0.959,13.5 0.957981241,13.9 C0.956,14.3 1.114,14.685 1.397,14.968 L14.022,27.593 C14.315,27.886 14.699,28.032 15.083,28.032 C15.466,28.032 15.85,27.886 16.143,27.593 C16.729,27.007 16.729,26.057 16.143,25.472 L6.109,15.438 L33.187,15.438 C34.015,15.438 34.687,14.766 34.687,13.938 C34.687,13.109 34.015,12.438 33.187,12.438',
    viewBox: '0 -4 37 37',
  },
  [SessionIconType.Caret]: {
    path: 'M127.5 191.25L255 63.75L0 63.75L127.5 191.25Z',
    viewBox: '-200 -200 640 640',
  },
  [SessionIconType.ChatBubble]: {
    path:
      'M6.29289322,16.2928932 C6.4804296,16.1053568 6.73478351,16 7,16 L19,16 C19.5522847,16 20,15.5522847 20,15 L20,5 C20,4.44771525 19.5522847,4 19,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.5857864 L6.29289322,16.2928932 Z M7.41421356,18 L3.70710678,21.7071068 C3.07714192,22.3370716 2,21.8909049 2,21 L2,5 C2,3.34314575 3.34314575,2 5,2 L19,2 C20.6568542,2 22,3.34314575 22,5 L22,15 C22,16.6568542 20.6568542,18 19,18 L7.41421356,18 Z',
    viewBox: '0.5 2 23 20',
  },
  [SessionIconType.Check]: {
    path:
      'M0.77,2.61c-0.15-0.15-0.38-0.15-0.53,0c-0.15,0.15-0.15,0.38,0,0.53l1.87,1.87c0.15,0.15,0.38,0.15,0.53,0 l4.12-4.12c0.15-0.15,0.15-0.38,0-0.53c-0.15-0.15-0.38-0.15-0.53,0L2.38,4.22L0.77,2.61z',
    viewBox: '0 0 7 6',
  },
  [SessionIconType.Chevron]: {
    path:
      'M12,13.5857864 L6.70710678,8.29289322 C6.31658249,7.90236893 5.68341751,7.90236893 5.29289322,8.29289322 C4.90236893,8.68341751 4.90236893,9.31658249 5.29289322,9.70710678 L11.2928932,15.7071068 C11.6834175,16.0976311 12.3165825,16.0976311 12.7071068,15.7071068 L18.7071068,9.70710678 C19.0976311,9.31658249 19.0976311,8.68341751 18.7071068,8.29289322 C18.3165825,7.90236893 17.6834175,7.90236893 17.2928932,8.29289322 L12,13.5857864 Z',
    viewBox: '1.5 5.5 21 12',
  },
  [SessionIconType.CircleCheck]: {
    path:
      'M4.77,7.61c-0.15-0.15-0.38-0.15-0.53,0c-0.15,0.15-0.15,0.38,0,0.53l1.88,1.88c0.15,0.15,0.38,0.15,0.53,0 l4.13-4.12c0.15-0.15,0.15-0.38,0-0.53c-0.15-0.15-0.38-0.15-0.53,0L6.38,9.22L4.77,7.61z',
    viewBox: '0 0 15 15',
  },
  [SessionIconType.CircleCheckFilled]: {
    path:
      'M3.77,6.61c-0.15-0.15-0.38-0.15-0.53,0c-0.15,0.15-0.15,0.38,0,0.53l1.88,1.88c0.15,0.15,0.38,0.15,0.53,0 L9.78,4.9c0.15-0.15,0.15-0.38,0-0.53c-0.15-0.15-0.38-0.15-0.53,0L5.38,8.22L3.77,6.61z',
    viewBox: '0 0 13 13',
  },
  [SessionIconType.CircleElipses]: {
    path:
      'M4.76,7.47c0-0.32,0.26-0.57,0.57-0.57c0.32,0,0.57,0.25,0.57,0.57c0,0.31-0.25,0.57-0.57,0.57 C5.02,8.04,4.76,7.78,4.76,7.47z M7.04,7.47c0-0.32,0.26-0.57,0.57-0.57c0.32,0,0.57,0.25,0.57,0.57c0,0.31-0.25,0.57-0.57,0.57 C7.3,8.04,7.04,7.78,7.04,7.47z M9.32,7.47c0-0.32,0.26-0.57,0.57-0.57c0.32,0,0.57,0.25,0.57,0.57c0,0.31-0.25,0.57-0.57,0.57 C9.58,8.04,9.32,7.78,9.32,7.47z',
    viewBox: '0 0 15 15',
  },
  [SessionIconType.CirclePlus]: {
    path:
      'M13.51,8.82c-0.35,0-0.63,0.28-0.62,0.62v3.43H9.46c-0.35,0-0.63,0.28-0.62,0.62 c0,0.35,0.28,0.63,0.62,0.62h3.43v3.43c-0.02,0.35,0.27,0.63,0.61,0.63c0.17,0,0.33-0.07,0.44-0.18 c0.11-0.11,0.18-0.27,0.18-0.44v-3.43h3.43c0.17,0,0.33-0.07,0.44-0.18c0.11-0.11,0.18-0.27,0.18-0.44 c0-0.35-0.28-0.63-0.62-0.62h-3.43V9.44C14.13,9.09,13.85,8.81,13.51,8.82z M21.46,5.54c4.39,4.39,4.39,11.53,0,15.92 c-4.39,4.39-11.53,4.39-15.92,0s-4.39-11.53,0-15.92C9.93,1.15,17.07,1.15,21.46,5.54z M22.34,22.34 c4.88-4.88,4.88-12.81,0-17.69s-12.81-4.88-17.69,0s-4.88,12.81,0,17.69S17.47,27.22,22.34,22.34z M13.51,8.82c-0.35,0-0.63,0.28-0.62,0.62v3.43H9.46c-0.35,0-0.63,0.28-0.62,0.62 c0,0.35,0.28,0.63,0.62,0.62h3.43v3.43c-0.02,0.35,0.27,0.63,0.61,0.63c0.17,0,0.33-0.07,0.44-0.18 c0.11-0.11,0.18-0.27,0.18-0.44v-3.43h3.43c0.17,0,0.33-0.07,0.44-0.18c0.11-0.11,0.18-0.27,0.18-0.44 c0-0.35-0.28-0.63-0.62-0.62h-3.43V9.44C14.13,9.09,13.85,8.81,13.51,8.82z M21.46,5.54c4.39,4.39,4.39,11.53,0,15.92 c-4.39,4.39-11.53,4.39-15.92,0c-4.39-4.39-4.39-11.53,0-15.92C9.93,1.15,17.07,1.15,21.46,5.54z M22.34,22.34 c4.88-4.88,4.88-12.81,0-17.69s-12.81-4.88-17.69,0s-4.88,12.81,0,17.69S17.47,27.22,22.34,22.34z',
    viewBox: '0 0 27 27',
  },
  [SessionIconType.Contacts]: {
    path:
      'M13,14 C15.6887547,14 17.8818181,16.1223067 17.9953805,18.7831104 L18,19 L18,21 C18,21.5522847 17.5522847,22 17,22 C16.4871642,22 16.0644928,21.6139598 16.0067277,21.1166211 L16,21 L16,19 C16,17.4023191 14.75108,16.0963391 13.1762728,16.0050927 L13,16 L5,16 C3.40231912,16 2.09633912,17.24892 2.00509269,18.8237272 L2,19 L2,21 C2,21.5522847 1.55228475,22 1,22 C0.487164161,22 0.0644928393,21.6139598 0.00672773133,21.1166211 L0,21 L0,19 C0,16.3112453 2.12230671,14.1181819 4.78311038,14.0046195 L5,14 L13,14 Z M20.2499997,14.1617541 C22.3827066,14.712416 23.8947586,16.5896121 23.994728,18.773074 L24,19 L24,21 C24,21.5522847 23.5522847,22 23,22 C22.4871642,22 22.0644928,21.6139598 22.0067277,21.1166211 L22,21 L22.0000003,19.0007459 C21.9989805,17.6335842 21.0737494,16.440036 19.7500003,16.0982459 C19.2152528,15.9601749 18.8936831,15.4147477 19.0317541,14.8800003 C19.1698251,14.3452528 19.7152523,14.0236831 20.2499997,14.1617541 Z M9,2 C11.7614237,2 14,4.23857625 14,7 C14,9.76142375 11.7614237,12 9,12 C6.23857625,12 4,9.76142375 4,7 C4,4.23857625 6.23857625,2 9,2 Z M16.2480392,2.16125 C18.4604327,2.72771223 20.0078433,4.72123893 20.0078433,7.005 C20.0078433,9.28876107 18.4604327,11.2822878 16.2480392,11.84875 C15.7130133,11.9857383 15.1682383,11.663065 15.03125,11.1280392 C14.8942617,10.5930133 15.216935,10.0482383 15.7519608,9.91125 C17.0793969,9.57137266 18.0078433,8.37525664 18.0078433,7.005 C18.0078433,5.63474336 17.0793969,4.43862734 15.7519608,4.09875 C15.216935,3.96176174 14.8942617,3.41698667 15.03125,2.88196081 C15.1682383,2.34693496 15.7130133,2.02426174 16.2480392,2.16125 Z M9,4 C7.34314575,4 6,5.34314575 6,7 C6,8.65685425 7.34314575,10 9,10 C10.6568542,10 12,8.65685425 12,7 C12,5.34314575 10.6568542,4 9,4 lZ',
    viewBox: '0 2.5 24 20',
  },
  [SessionIconType.Ellipses]: {
    path:
      'M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z',
    viewBox: '-5 -5 65 65',
  },
  [SessionIconType.Emoji]: {
    path:
      'M658.5,23 L658.5,23 C664.29899,23 669,18.2989899 669,12.5 C669,6.70101013 664.29899,2 658.5,2 C652.70101,2 648,6.70101013 648,12.5 C648,18.2989899 652.70101,23 658.5,23 L658.5,23 Z M658.5,0 C665.403559,0 671,5.59644063 671,12.5 C671,19.3005212 665.569371,24.8326509 658.808227,24.9962742 L658.5,25 C651.596441,25 646,19.4035594 646,12.5 C646,5.59644063 651.596441,0 658.5,0 Z M660.798501,17.7873294 C660.742971,17.8419887 660.574401,17.9669753 660.297777,18.1043071 C659.802509,18.3501864 659.201612,18.5 658.48738,18.5 C657.77446,18.5 657.180037,18.3508621 656.694112,18.1065603 C656.532157,18.0251362 656.396978,17.9401014 656.288844,17.8583962 C656.235083,17.8177752 656.208774,17.7945605 656.210408,17.7962096 C655.821715,17.4038623 655.188557,17.4008996 654.79621,17.7895923 C654.403862,18.1782849 654.4009,18.811443 654.789592,19.2037904 C654.985716,19.4017586 655.319663,19.6540855 655.795746,19.8934397 C656.552967,20.2741379 657.453192,20.5 658.48738,20.5 C659.520256,20.5 660.423471,20.2748136 661.187124,19.8956929 C661.665852,19.6580247 662.003047,19.4080113 662.201499,19.2126706 C662.595096,18.8252434 662.600098,18.1920982 662.212671,17.7985011 C661.825243,17.404904 661.192098,17.3999023 660.798501,17.7873294 Z M653,12 C652.171573,12 651.5,12.6715729 651.5,13.5 C651.5,14.3284271 652.171573,15 653,15 C653.828427,15 654.5,14.3284271 654.5,13.5 C654.5,12.6715729 653.828427,12 653,12 Z M664,12 C663.171573,12 662.5,12.6715729 662.5,13.5 C662.5,14.3284271 663.171573,15 664,15 C664.828427,15 665.5,14.3284271 665.5,13.5 C665.5,12.6715729 664.828427,12 664,12 lZ',
    viewBox: '645 0 26 26',
  },
  [SessionIconType.Error]: {
    path:
      'M164.666,0C73.871,0,0.004,73.871,0.004,164.672c0.009,90.792,73.876,164.656,164.662,164.656 c90.793,0,164.658-73.865,164.658-164.658C329.324,73.871,255.459,0,164.666,0z M164.666,30c31.734,0,60.933,11.042,83.975,29.477 L59.478,248.638c-18.431-23.04-29.471-52.237-29.474-83.967C30.004,90.413,90.413,30,164.666,30z M164.666,299.328 c-31.733,0-60.934-11.042-83.977-29.477L269.854,80.691c18.431,23.043,29.471,52.244,29.471,83.979 C299.324,238.921,238.917,299.328,164.666,299.328z',
    viewBox: '0 0 329.328 329.328',
  },
  [SessionIconType.Eye]: {
    path:
      'M12,3 C15.3798024,3 18.3386923,4.63249094 20.8545372,7.31605887 C21.7188737,8.23801779 22.4694995,9.22244509 23.1056644,10.2074746 C23.4900327,10.8026256 23.7538591,11.2716502 23.8944272,11.5527864 C24.0351909,11.8343139 24.0351909,12.1656861 23.8944272,12.4472136 C23.7538591,12.7283498 23.4900327,13.1973744 23.1056644,13.7925254 C22.4694995,14.7775549 21.7188737,15.7619822 20.8545372,16.6839411 C18.3386923,19.3675091 15.3798024,21 12,21 C8.62019756,21 5.66130774,19.3675091 3.1454628,16.6839411 C2.28112631,15.7619822 1.5305005,14.7775549 0.894335622,13.7925254 C0.50996726,13.1973744 0.246140906,12.7283498 0.105572809,12.4472136 C-0.0351909363,12.1656861 -0.0351909363,11.8343139 0.105572809,11.5527864 C0.246140906,11.2716502 0.50996726,10.8026256 0.894335622,10.2074746 C1.5305005,9.22244509 2.28112631,8.23801779 3.1454628,7.31605887 C5.66130774,4.63249094 8.62019756,3 12,3 Z M12,5 C9.25480244,5 6.77619226,6.36750906 4.6045372,8.68394113 C3.82824869,9.51198221 3.149187,10.4025549 2.57441438,11.2925254 C2.41127724,11.5451249 2.26658862,11.7823697 2.14071218,12 C2.26658862,12.2176303 2.41127724,12.4548751 2.57441438,12.7074746 C3.149187,13.5974451 3.82824869,14.4880178 4.6045372,15.3160589 C6.77619226,17.6324909 9.25480244,19 12,19 C14.7451976,19 17.2238077,17.6324909 19.3954628,15.3160589 C20.1717513,14.4880178 20.850813,13.5974451 21.4255856,12.7074746 C21.5887228,12.4548751 21.7334114,12.2176303 21.8592878,12 C21.7334114,11.7823697 21.5887228,11.5451249 21.4255856,11.2925254 C20.850813,10.4025549 20.1717513,9.51198221 19.3954628,8.68394113 C17.2238077,6.36750906 14.7451976,5 12,5 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z M12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 lZ',
    viewBox: '0 3 24 18',
  },
  [SessionIconType.Exit]: {
    path:
      'M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88 c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242 C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z',
    viewBox: '0 0 47.971 47.971',
  },
  [SessionIconType.File]: {
    path:
      'M13,1 C13.0425909,1 13.0845598,1.00266262 13.1257495,1.00783047 L13,1 C13.0528361,1 13.1052411,1.00418141 13.1567725,1.01236099 C13.1883933,1.0172036 13.2193064,1.02361582 13.249662,1.03141743 C13.2598053,1.0342797 13.2698902,1.03704988 13.2799252,1.0399762 C13.3109399,1.04873224 13.3413507,1.05922617 13.3710585,1.07110396 C13.3800191,1.07496957 13.3890567,1.0787342 13.3980377,1.08263089 C13.4262995,1.09463815 13.4536613,1.10806791 13.4802859,1.12267436 C13.4906553,1.12855823 13.5012587,1.13461331 13.5117542,1.14086468 C13.5399066,1.15749759 13.5670269,1.17554946 13.5931738,1.19484452 C13.5995817,1.19963491 13.6064603,1.20483437 13.6132762,1.21012666 C13.6177282,1.21353888 13.6216003,1.21659988 13.625449,1.21968877 L13.7071068,1.29289322 L13.7071068,1.29289322 L20.7071068,8.29289322 C20.7364445,8.32223095 20.7639678,8.3533831 20.7894939,8.38616693 L20.7071068,8.29289322 C20.7429509,8.32873733 20.7757929,8.36702236 20.8054709,8.40735764 C20.8244505,8.43297305 20.8425024,8.46009338 20.8592238,8.48809993 C20.8653867,8.49874131 20.8714418,8.50934473 20.8772982,8.52005033 C20.8919321,8.54633874 20.9053618,8.57370048 20.9175449,8.60172936 C20.9212658,8.61094326 20.9250304,8.61998091 20.9286618,8.62907226 C20.9407738,8.65864932 20.9512678,8.68906007 20.9602981,8.72009403 C20.9629501,8.73010978 20.9657203,8.7401947 20.9683328,8.75032594 C20.9763842,8.78069364 20.9827964,8.81160666 20.9877474,8.84300527 C20.9892866,8.85360724 20.990772,8.86402246 20.9920936,8.8744695 C20.9973374,8.91544017 21,8.95740914 21,9 L21,9 L21,20 C21,21.6568542 19.6568542,23 18,23 L6,23 C4.34314575,23 3,21.6568542 3,20 L3,4 C3,2.34314575 4.34314575,1 6,1 Z M12,3 L6,3 C5.44771525,3 5,3.44771525 5,4 L5,20 C5,20.5522847 5.44771525,21 6,21 L18,21 C18.5522847,21 19,20.5522847 19,20 L19,10 L13,10 C12.4871642,10 12.0644928,9.61395981 12.0067277,9.11662113 L12,9 L12,3 Z M17.586,8 L14,4.415 L14,8 L17.586,8 lZ',
    viewBox: '0 0 24 24',
  },
  [SessionIconType.Gear]: {
    path:
      'M12,0 C13.6568542,0 15,1.34314575 15,3 L15,3.08601169 C15.0010253,3.34508314 15.1558067,3.57880297 15.4037653,3.68513742 C15.6468614,3.79242541 15.9307827,3.74094519 16.1128932,3.56289322 L16.1725,3.50328666 C16.7352048,2.93995553 17.4987723,2.62342669 18.295,2.62342669 C19.0912277,2.62342669 19.8547952,2.93995553 20.4167133,3.5025 C20.9800445,4.06520477 21.2965733,4.82877226 21.2965733,5.625 C21.2965733,6.42122774 20.9800445,7.18479523 20.4171068,7.74710678 L20.3648626,7.79926496 C20.1790548,7.98921731 20.1275746,8.27313857 20.2348626,8.51623466 C20.26314,8.58030647 20.2845309,8.64699387 20.2987985,8.71517468 C20.4176633,8.89040605 20.6163373,8.99914118 20.83,9 L21,9 C22.6568542,9 24,10.3431458 24,12 C24,13.6568542 22.6568542,15 21,15 L20.9139883,15 C20.6549169,15.0010253 20.421197,15.1558067 20.3191398,15.3939314 C20.2075746,15.6468614 20.2590548,15.9307827 20.4371068,16.1128932 L20.4967133,16.1725 C21.0600445,16.7352048 21.3765733,17.4987723 21.3765733,18.295 C21.3765733,19.0912277 21.0600445,19.8547952 20.4975,20.4167133 C19.9347952,20.9800445 19.1712277,21.2965733 18.375,21.2965733 C17.5787723,21.2965733 16.8152048,20.9800445 16.2528932,20.4171068 L16.200735,20.3648626 C16.0107827,20.1790548 15.7268614,20.1275746 15.4739314,20.2391398 C15.2358067,20.341197 15.0810253,20.5749169 15.08,20.83 L15.08,21 C15.08,22.6568542 13.7368542,24 12.08,24 C10.4231458,24 9.08,22.6568542 9.08,21 C9.07403212,20.6665579 8.90531385,20.4306648 8.59623466,20.3148626 C8.35313857,20.2075746 8.06921731,20.2590548 7.88710678,20.4371068 L7.8275,20.4967133 C7.26479523,21.0600445 6.50122774,21.3765733 5.705,21.3765733 C4.90877226,21.3765733 4.14520477,21.0600445 3.58328666,20.4975 C3.01995553,19.9347952 2.70342669,19.1712277 2.70342669,18.375 C2.70342669,17.5787723 3.01995553,16.8152048 3.58289322,16.2528932 L3.63513742,16.200735 C3.82094519,16.0107827 3.87242541,15.7268614 3.76086017,15.4739314 C3.65880297,15.2358067 3.42508314,15.0810253 3.17,15.08 L3,15.08 C1.34314575,15.08 0,13.7368542 0,12.08 C0,10.4231458 1.34314575,9.08 3,9.08 C3.33344206,9.07403212 3.56933519,8.90531385 3.68513742,8.59623466 C3.79242541,8.35313857 3.74094519,8.06921731 3.56289322,7.88710678 L3.50328666,7.8275 C2.93995553,7.26479523 2.62342669,6.50122774 2.62342669,5.705 C2.62342669,4.90877226 2.93995553,4.14520477 3.5025,3.58328666 C4.06520477,3.01995553 4.82877226,2.70342669 5.625,2.70342669 C6.42122774,2.70342669 7.18479523,3.01995553 7.74710678,3.58289322 L7.79926496,3.63513742 C7.98921731,3.82094519 8.27313857,3.87242541 8.51623466,3.76513742 C8.58030647,3.73685997 8.64699387,3.71546911 8.71517468,3.70120146 C8.89040605,3.58233675 8.99914118,3.3836627 9,3.17 L9,3 C9,1.34314575 10.3431458,0 12,0 Z M12,2 C11.4477153,2 11,2.44771525 11,3 L11,3.17398831 C10.9957795,4.2302027 10.3647479,5.18306046 9.39393144,5.59913983 C9.30943133,5.63535548 9.22053528,5.65966354 9.12978593,5.67154209 C8.1847178,6.00283804 7.12462982,5.77295717 6.39289322,5.05710678 L6.3325,4.99671334 C6.14493174,4.8089363 5.89040925,4.70342669 5.625,4.70342669 C5.35959075,4.70342669 5.10506826,4.8089363 4.91671334,4.9975 C4.7289363,5.18506826 4.62342669,5.43959075 4.62342669,5.705 C4.62342669,5.97040925 4.7289363,6.22493174 4.91710678,6.41289322 L4.98486258,6.48073504 C5.74238657,7.25515616 5.9522675,8.41268129 5.5385361,9.34518109 C5.16293446,10.3664297 4.2012163,11.0542811 3.09,11.08 L3,11.08 C2.44771525,11.08 2,11.5277153 2,12.08 C2,12.6322847 2.44771525,13.08 3,13.08 L3.17398831,13.080008 C4.2302027,13.0842205 5.18306046,13.7152521 5.59486258,14.6762347 C6.0322675,15.6673187 5.82238657,16.8248438 5.05710678,17.6071068 L4.99671334,17.6675 C4.8089363,17.8550683 4.70342669,18.1095908 4.70342669,18.375 C4.70342669,18.6404092 4.8089363,18.8949317 4.9975,19.0832867 C5.18506826,19.2710637 5.43959075,19.3765733 5.705,19.3765733 C5.97040925,19.3765733 6.22493174,19.2710637 6.41289322,19.0828932 L6.48073504,19.0151374 C7.25515616,18.2576134 8.41268129,18.0477325 9.34518109,18.4614639 C10.3664297,18.8370655 11.0542811,19.7987837 11.08,20.91 L11.08,21 C11.08,21.5522847 11.5277153,22 12.08,22 C12.6322847,22 13.08,21.5522847 13.08,21 L13.080008,20.8260117 C13.0842205,19.7697973 13.7152521,18.8169395 14.6762347,18.4051374 C15.6673187,17.9677325 16.8248438,18.1776134 17.6071068,18.9428932 L17.6675,19.0032867 C17.8550683,19.1910637 18.1095908,19.2965733 18.375,19.2965733 C18.6404092,19.2965733 18.8949317,19.1910637 19.0832867,19.0025 C19.2710637,18.8149317 19.3765733,18.5604092 19.3765733,18.295 C19.3765733,18.0295908 19.2710637,17.7750683 19.0828932,17.5871068 L19.0151374,17.519265 C18.2576134,16.7448438 18.0477325,15.5873187 18.4851374,14.5962347 C18.8969395,13.6352521 19.8497973,13.0042205 20.91,13 L21,13 C21.5522847,13 22,12.5522847 22,12 C22,11.4477153 21.5522847,11 21,11 L20.8260117,11 C19.7697973,10.9957795 18.8169395,10.3647479 18.4008602,9.39393144 C18.3646445,9.30943133 18.3403365,9.22053528 18.3284579,9.12978593 C17.997162,8.1847178 18.2270428,7.12462982 18.9428932,6.39289322 L19.0032867,6.3325 C19.1910637,6.14493174 19.2965733,5.89040925 19.2965733,5.625 C19.2965733,5.35959075 19.1910637,5.10506826 19.0025,4.91671334 C18.8149317,4.7289363 18.5604092,4.62342669 18.295,4.62342669 C18.0295908,4.62342669 17.7750683,4.7289363 17.5871068,4.91710678 L17.519265,4.98486258 C16.7448438,5.74238657 15.5873187,5.9522675 14.6060686,5.51913983 C13.6352521,5.10306046 13.0042205,4.1502027 13,3.09 L13,3 C13,2.44771525 12.5522847,2 12,2 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z M12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 lZ',
    viewBox: '0 0 24 24',
  },
  [SessionIconType.Globe]: {
    path:
      'M16,1.99999996 C8.26801348,1.99999996 1.99999996,8.26801348 1.99999996,16 C1.99999996,23.7319865 8.26801348,30 16,30 C23.7319865,30 30,23.7319865 30,16 C30,12.2869691 28.5250043,8.72601434 25.899495,6.10050503 C23.2739857,3.47499573 19.7130309,1.99999996 16,1.99999996 Z M24,15 C23.9541824,13.7847684 23.81713,12.5746962 23.59,11.38 C25.78,12.29 27.34,13.57 27.84,15 L24,15 Z M22,15 L17,15 L17,9.99999998 C18.4647569,10.0572205 19.9194297,10.2683827 21.34,10.63 C21.7186973,12.058241 21.9400138,13.5236242 22,15 Z M17,7.99999997 L17,4.18999996 C18.43,4.68999996 19.71,6.24999997 20.62,8.43999998 C19.426069,8.2027972 18.2159902,8.05571581 17,7.99999998 L17,7.99999997 Z M15,4.18999996 L15,7.99999997 C13.7847684,8.04581761 12.5746962,8.18286998 11.38,8.40999998 C12.29,6.24999997 13.57,4.68999996 15,4.18999996 Z M15,9.99999998 L15,15 L9.99999998,15 C10.0523471,13.5347995 10.2635844,12.0796099 10.63,10.66 C12.0592465,10.2861705 13.5241011,10.0649339 15,9.99999998 L15,9.99999998 Z M7.99999997,15 L4.18999996,15 C4.68999996,13.57 6.24999997,12.29 8.43999998,11.38 C8.2027972,12.573931 8.05571581,13.7840098 7.99999998,15 L7.99999997,15 Z M7.99999997,17 C8.04581761,18.2152316 8.18286998,19.4253038 8.40999998,20.62 C6.24999997,19.71 4.68999996,18.43 4.18999996,17 L7.99999997,17 Z M9.99999998,17 L15,17 L15,22 C13.5352431,21.9427795 12.0805703,21.7316173 10.66,21.37 C10.2813027,19.941759 10.0599862,18.4763758 9.99999998,17 L9.99999998,17 Z M15,24 L15,27.84 C13.57,27.34 12.29,25.78 11.38,23.59 C12.5746962,23.81713 13.7847684,23.9541824 15,24 Z M17,27.84 L17,24 C18.2152316,23.9541824 19.4253038,23.81713 20.62,23.59 C19.71,25.75 18.43,27.31 17,27.81 L17,27.84 Z M17,22 L17,17 L22,17 C21.9476529,18.4652005 21.7364156,19.9203901 21.37,21.34 C19.9407535,21.7138295 18.4758989,21.9350661 17,22 L17,22 Z M24,17 L27.84,17 C27.34,18.43 25.78,19.71 23.59,20.62 C23.81713,19.4253038 23.9541824,18.2152316 24,17 L24,17 Z M26.87,10.88 C25.6762805,10.0719416 24.3730724,9.43885859 23,8.99999998 C22.5705064,7.62858818 21.9475643,6.32546065 21.15,5.12999997 C23.6492047,6.33846833 25.6578129,8.36825686 26.84,10.88 L26.87,10.88 Z M10.87,5.15999997 C10.0679904,6.34500038 9.43836847,7.63791394 8.99999998,8.99999998 C7.62858818,9.42949358 6.32546065,10.0524357 5.12999997,10.85 C6.33846833,8.35079527 8.36825686,6.34218713 10.88,5.15999997 L10.87,5.15999997 Z M5.14999997,21.16 C6.33983272,21.9523657 7.63608858,22.571875 8.99999998,23 C9.42949358,24.3714118 10.0524357,25.6745393 10.85,26.87 C8.35079527,25.6615317 6.34218713,23.6317431 5.15999997,21.12 L5.14999997,21.16 Z M21.15,26.88 C21.9484187,25.681438 22.5713875,24.3748872 23,23 C24.3714118,22.5705064 25.6745393,21.9475643 26.87,21.15 C25.6615317,23.6492047 23.6317431,25.6578129 21.12,26.84 L21.15,26.88 lZ',
    viewBox: '0.5 0 30 30',
  },
  [SessionIconType.Info]: {
    path:
      'M17.5,2.4c-1.82-1.5-4.21-2.1-6.57-1.64c-3.09,0.6-5.57,3.09-6.15,6.19c-0.4,2.1,0.04,4.21,1.22,5.95 C7.23,14.7,8,16.41,8.36,18.12c0.17,0.81,0.89,1.41,1.72,1.41h4.85c0.83,0,1.55-0.59,1.72-1.42c0.37-1.82,1.13-3.55,2.19-4.99 c1-1.36,1.53-2.96,1.53-4.65C20.37,6.11,19.32,3.9,17.5,2.4z M17.47,12.11c-1.21,1.64-2.07,3.6-2.55,5.72l-4.91-0.05 c-0.4-1.93-1.25-3.84-2.62-5.84c-0.93-1.36-1.27-3.02-0.95-4.67c0.46-2.42,2.39-4.37,4.81-4.83c0.41-0.08,0.82-0.12,1.23-0.12 c1.44,0,2.82,0.49,3.94,1.4c1.43,1.18,2.25,2.91,2.25,4.76C18.67,9.79,18.25,11.04,17.47,12.11z M15.94,20.27H9.61c-0.47,0-0.85,0.38-0.85,0.85s0.38,0.85,0.85,0.85h6.33c0.47,0,0.85-0.38,0.85-0.85 S16.41,20.27,15.94,20.27z M15.94,22.7H9.61c-0.47,0-0.85,0.38-0.85,0.85s0.38,0.85,0.85,0.85h6.33c0.47,0,0.85-0.38,0.85-0.85 S16.41,22.7,15.94,22.7z M12.5,3.28c-2.89,0-5.23,2.35-5.23,5.23c0,0.47,0.38,0.85,0.85,0.85s0.85-0.38,0.85-0.85 c0-1.95,1.59-3.53,3.54-3.53c0.47,0,0.85-0.38,0.85-0.85S12.97,3.28,12.5,3.28z',
    viewBox: '0 0 25 25',
  },
  [SessionIconType.Lock]: {
    path:
      'M417.684,188.632H94.316c-9.923,0-17.965,8.042-17.965,17.965v239.532c0,7.952,5.234,14.965,12.863,17.222l161.684,47.906 c1.665,0.497,3.383,0.743,5.102,0.743c1.719,0,3.437-0.246,5.108-0.743l161.684-47.906c7.623-2.258,12.857-9.27,12.857-17.222 V206.596C435.649,196.674,427.607,188.632,417.684,188.632z M399.719,432.715L256,475.298l-143.719-42.583V224.561h287.439 V432.715z M256,0c-69.345,0-125.754,56.949-125.754,126.952v76.052h35.93v-76.052c0-50.188,40.295-91.022,89.825-91.022 s89.825,40.834,89.825,91.022v76.65h35.93v-76.65C381.754,56.949,325.339,0,256,0z M256,308.398c-9.923,0-17.965,8.042-17.965,17.965v47.906c0,9.923,8.042,17.965,17.965,17.965 c9.923,0,17.965-8.042,17.965-17.965v-47.906C273.965,316.44,265.923,308.398,256,308.398z',
    viewBox: '0 0 512 512',
  },
  [SessionIconType.Microphone]: {
    path:
      'M43.362728,18.444286 C46.0752408,18.444286 48.2861946,16.2442453 48.2861946,13.5451212 L48.2861946,6.8991648 C48.2861946,4.20004074 46.0752408,2 43.362728,2 C40.6502153,2 38.4392615,4.20004074 38.4392615,6.8991648 L38.4392615,13.5451212 C38.4392615,16.249338 40.6502153,18.444286 43.362728,18.444286 Z M51.0908304,12.9238134 C51.4388509,12.9238134 51.7203381,13.2039112 51.7203381,13.5502139 C51.7203381,17.9248319 48.3066664,21.5202689 43.9871178,21.8411082 L43.9871178,21.8411082 L43.9871178,25.747199 L47.2574869,25.747199 C47.6055074,25.747199 47.8869946,26.0272968 47.8869946,26.3735995 C47.8869946,26.7199022 47.6055074,27 47.2574869,27 L47.2574869,27 L39.4628512,27 C39.1148307,27 38.8333435,26.7199022 38.8333435,26.3735995 C38.8333435,26.0272968 39.1148307,25.747199 39.4628512,25.747199 L39.4628512,25.747199 L42.7332204,25.747199 L42.7332204,21.8411082 C38.4136717,21.5253616 35,17.9248319 35,13.5502139 C35,13.2039112 35.2814872,12.9238134 35.6295077,12.9238134 C35.9775282,12.9238134 36.2538974,13.2039112 36.2436615,13.5502139 C36.2436615,17.4512121 39.4321435,20.623956 43.3524921,20.623956 C47.2728408,20.623956 50.4613228,17.4512121 50.4613228,13.5502139 C50.4613228,13.2039112 50.7428099,12.9238134 51.0908304,12.9238134 Z M43.362728,3.24770829 C45.3843177,3.24770829 47.0322972,4.88755347 47.0322972,6.8991648 L47.0322972,13.5451212 C47.0322972,15.5567325 45.3843177,17.1965777 43.362728,17.1965777 C41.3411383,17.1965777 39.6931589,15.5567325 39.6931589,13.5451212 L39.6931589,6.8991648 C39.6931589,4.88755347 41.3411383,3.24770829 43.362728,3.24770829 lZ',
    viewBox: '28 0 30 30',
  },
  [SessionIconType.Moon]: {
    path:
      'M11.1441877,12.8180303 C8.90278993,10.5766325 8.24397847,7.29260898 9.27752593,4.437982 C6.09633644,5.5873034 3.89540402,8.67837285 4.00385273,12.2078365 C4.13368986,16.4333868 7.52883112,19.8285281 11.7543814,19.9583652 C15.2838451,20.0668139 18.3749145,17.8658815 19.5242359,14.684692 C16.669609,15.7182395 13.3855854,15.059428 11.1441877,12.8180303 Z M21.9576498,12.8823459 C21.4713729,18.1443552 16.9748949,22.1197182 11.692957,21.9574217 C6.41101918,21.7951253 2.16709261,17.5511988 2.00479619,12.2692609 C1.84249977,6.98732307 5.81786273,2.49084501 11.0798721,2.00456809 C11.9400195,1.92507947 12.4895134,2.90008536 11.9760569,3.59473245 C10.2106529,5.98311963 10.4582768,9.30369233 12.5584012,11.4038167 C14.6585256,13.5039411 17.9790983,13.7515651 20.3674855,11.986161 C21.0621326,11.4727046 22.0371385,12.0221984 21.9576498,12.8823459 lZ',
    viewBox: '0.5 0.5 22 22',
  },
  [SessionIconType.Reply]: {
    path:
      'M4,3 C4.55228475,3 5,3.44771525 5,4 L5,4 L5,11 C5,12.6568542 6.34314575,14 8,14 L8,14 L17.585,14 L14.2928932,10.7071068 C13.9324093,10.3466228 13.9046797,9.77939176 14.2097046,9.38710056 L14.2928932,9.29289322 C14.6834175,8.90236893 15.3165825,8.90236893 15.7071068,9.29289322 L15.7071068,9.29289322 L20.7071068,14.2928932 C20.7355731,14.3213595 20.7623312,14.3515341 20.787214,14.3832499 C20.788658,14.3849951 20.7902348,14.3870172 20.7918027,14.389044 C20.8140715,14.4179625 20.8348358,14.4480862 20.8539326,14.4793398 C20.8613931,14.4913869 20.8685012,14.5036056 20.8753288,14.5159379 C20.8862061,14.5357061 20.8966234,14.5561086 20.9063462,14.5769009 C20.914321,14.5939015 20.9218036,14.6112044 20.9287745,14.628664 C20.9366843,14.6484208 20.9438775,14.6682023 20.9504533,14.6882636 C20.9552713,14.7031487 20.9599023,14.7185367 20.9641549,14.734007 C20.9701664,14.7555635 20.9753602,14.7772539 20.9798348,14.7992059 C20.9832978,14.8166247 20.9863719,14.834051 20.9889822,14.8515331 C20.9962388,14.8996379 21,14.9493797 21,15 L20.9962979,14.9137692 C20.9978436,14.9317345 20.9989053,14.9497336 20.9994829,14.9677454 L21,15 C21,15.0112225 20.9998151,15.0224019 20.9994483,15.0335352 C20.9988772,15.050591 20.997855,15.0679231 20.996384,15.0852242 C20.994564,15.1070574 20.9920941,15.1281144 20.9889807,15.1489612 C20.9863719,15.165949 20.9832978,15.1833753 20.9797599,15.2007258 C20.9753602,15.2227461 20.9701664,15.2444365 20.964279,15.2658396 C20.9599023,15.2814633 20.9552713,15.2968513 20.9502619,15.3121425 C20.9438775,15.3317977 20.9366843,15.3515792 20.928896,15.3710585 C20.9218036,15.3887956 20.914321,15.4060985 20.9063266,15.4232215 C20.8974314,15.4421635 20.8879327,15.4609002 20.8778732,15.4792864 C20.8703855,15.4931447 20.862375,15.5070057 20.8540045,15.5207088 C20.8382813,15.546275 20.8215099,15.5711307 20.8036865,15.5951593 C20.774687,15.6343256 20.7425008,15.6717127 20.7071068,15.7071068 L20.787214,15.6167501 C20.7849289,15.6196628 20.7826279,15.6225624 20.7803112,15.625449 L20.7071068,15.7071068 L15.7071068,20.7071068 C15.3165825,21.0976311 14.6834175,21.0976311 14.2928932,20.7071068 C13.9023689,20.3165825 13.9023689,19.6834175 14.2928932,19.2928932 L14.2928932,19.2928932 L17.585,16 L8,16 C5.3112453,16 3.11818189,13.8776933 3.00461951,11.2168896 L3,11 L3,4 C3,3.44771525 3.44771525,3 4,3 lZ',
    viewBox: '-0.5 0.3 23 22',
  },
  [SessionIconType.Search]: {
    path:
      'M16.5260392,16.2168725 L13.3593725,12.879521 C13.2567964,12.7688667 13.1425871,12.670895 13.0189558,12.5875028 L12.2272892,12.0118096 L12.2272892,12.0118096 C13.8556873,9.88830358 13.8708099,6.85915463 12.2637039,4.71770761 C10.6565979,2.57626059 7.85617522,1.8940349 5.52036814,3.07492811 C3.18456106,4.25582133 1.93676065,6.98467116 2.51570128,9.64591861 C3.09464191,12.3071661 5.34581319,14.190565 7.93645584,14.1810881 C9.19365936,14.1814736 10.4136244,13.7313239 11.3960392,12.9045511 L11.3960392,12.9045511 L11.9897892,13.738889 C12.0602158,13.8463397 12.1397052,13.9468684 12.2272892,14.0392507 L15.3939558,17.3766021 C15.4682801,17.4555775 15.5694535,17.5 15.6749975,17.5 C15.7805415,17.5 15.8817149,17.4555775 15.9560392,17.3766021 L16.5102058,16.7925656 C16.6604889,16.6359051 16.6674599,16.3824439 16.5260392,16.2168725 Z M7.93645584,12.5124123 C5.7503287,12.5124123 3.9781225,10.6446834 3.9781225,8.340723 C3.9781225,6.03676259 5.7503287,4.16903366 7.93645584,4.16903366 C10.122583,4.16903366 11.8947892,6.03676259 11.8947892,8.340723 C11.8947892,9.44712381 11.4777517,10.5082093 10.7354202,11.2905528 C9.99308868,12.0728963 8.98627111,12.5124123 7.93645584,12.5124123 lZ',
    viewBox: '2.3 1.8 15 16',
  },
  [SessionIconType.Send]: {
    path:
      'M12.3266,4.71786207 L2.2646,4.71786207 L5.98482857,0.989241379 C6.20434286,0.768862069 6.20768571,0.408896552 5.99225714,0.184344828 C5.77608571,-0.0398275862 5.4236,-0.042862069 5.20408571,0.176758621 L0.5226,4.86882759 C0.416371429,4.97541379 0.3562,5.12068966 0.355821604,5.27241379 C0.355085714,5.42413793 0.413771429,5.57017241 0.518885714,5.67751724 L5.20817143,10.4663103 C5.317,10.5774483 5.45962857,10.6328276 5.60225714,10.6328276 C5.74451429,10.6328276 5.88714286,10.5774483 5.99597143,10.4663103 C6.21362857,10.2440345 6.21362857,9.88368966 5.99597143,9.6617931 L2.26905714,5.8557931 L12.3266,5.8557931 C12.6341429,5.8557931 12.8837429,5.60089655 12.8837429,5.28682759 C12.8837429,4.97237931 12.6341429,4.71786207 12.3266,4.71786207',
    viewBox: '-1 -2 15 15',
  },
  [SessionIconType.Star]: {
    path:
      'M9.80779568,8.70262392 C9.66225594,8.99747141 9.38107073,9.20193068 9.05571654,9.24948607 L4.1495,9.9666031 L7.69882113,13.4236419 C7.93469487,13.6533829 8.0423575,13.9845141 7.98669695,14.3090433 L7.14926913,19.1916734 L11.5356371,16.8849265 C11.8270199,16.7316912 12.1751567,16.7316912 12.4665396,16.8849265 L16.8529075,19.1916734 L16.0154797,14.3090433 C15.9598192,13.9845141 16.0674818,13.6533829 16.3033555,13.4236419 L19.8526767,9.9666031 L14.9464601,9.24948607 C14.6211059,9.20193068 14.3399207,8.99747141 14.194381,8.70262392 L12.0010883,4.25925434 L9.80779568,8.70262392 Z M8.24682697,7.3464661 L11.104381,1.55737608 C11.4712164,0.814207972 12.5309603,0.814207972 12.8977957,1.55737608 L15.7553497,7.3464661 L22.1457165,8.28051393 C22.9656312,8.40035674 23.2924147,9.40819801 22.6988211,9.98635811 L18.0756101,14.4893656 L19.166697,20.8509567 C19.3068155,21.6679189 18.4492666,22.2908819 17.7156371,21.9050735 L12.0010883,18.8998497 L6.28653961,21.9050735 C5.55291004,22.2908819 4.69536119,21.6679189 4.83547972,20.8509567 L5.92656655,14.4893656 L1.30335554,9.98635811 C0.709762006,9.40819801 1.03654545,8.40035674 1.85646012,8.28051393 L8.24682697,7.3464661 lZ',
    viewBox: '0 0 22 21',
  },
  [SessionIconType.QR]: {
    path:
      'M0 0v170h170V0H0zm130 130H40V40h90v90z M65 65h40v40H65zM342 0v170h170V0H342zm130 130h-90V40h90v90z M407 65h40v40h-40zM0 342v170h170V342H0zm130 130H40v-90h90v90z M65 407h40v40H65zM40 197h40v40H40zM120 277v-40H80v40h39v40h40v-40zM280 77h40v40h-40zM200 40h40v77h-40zM240 0h40v40h-40zM240 117v40h-40v40h80v-80zM280 355v-39h-40v-79h-40v80h40v39h40v39h80v-40z M280 197h40v80h-40zM472 236v-39h-73v40h-39v40h40v39h112v-80h-40zm0 40h-72v-39h72v39zM472 355h40v80h-40zM320 277h40v40h-40zM360 395h40v40h-40zM400 355h40v40h-40zM400 435v77h40v-37h32v-40zM200 356h40v76h-40zM320 472v-40h-80v80h40v-40h39v40h40v-40zM120 197h80v40h-80zM0 237h40v80H0z',
    viewBox: '0 0 512 512',
  },
  [SessionIconType.Users]: {
    path:
      'M9.38,2.17c-1.73,0-3.12,1.4-3.12,3.12s1.4,3.12,3.12,3.12s3.12-1.4,3.12-3.12S11.1,2.17,9.38,2.17z M16.93,0.25c2.3,0.59,3.92,2.67,3.92,5.05s-1.61,4.46-3.92,5.05c-0.56,0.14-1.12-0.19-1.27-0.75c-0.14-0.56,0.19-1.12,0.75-1.27 c1.38-0.35,2.35-1.6,2.35-3.03s-0.97-2.67-2.35-3.03c-0.56-0.14-0.9-0.71-0.75-1.27C15.8,0.44,16.37,0.11,16.93,0.25z M9.38,0.08 c2.88,0,5.21,2.33,5.21,5.21s-2.33,5.21-5.21,5.21S4.17,8.17,4.17,5.29C4.17,2.42,6.5,0.08,9.38,0.08z M21.09,12.75 c2.22,0.57,3.8,2.53,3.9,4.81L25,17.79v2.08c0,0.58-0.47,1.04-1.04,1.04c-0.54,0-0.98-0.41-1.04-0.93l-0.01-0.11v-2.08 c0-1.42-0.96-2.67-2.34-3.02c-0.56-0.14-0.89-0.71-0.75-1.27C19.97,12.94,20.54,12.61,21.09,12.75z M13.54,12.58 c2.8,0,5.09,2.21,5.2,4.99v0.22v2.08c0,0.58-0.47,1.04-1.04,1.04c-0.54,0-0.98-0.41-1.04-0.93l-0.01-0.11v-2.08 c0-1.67-1.3-3.03-2.95-3.12h-0.18H5.21c-1.67,0-3.03,1.3-3.12,2.95v0.18v2.08c0,0.58-0.47,1.04-1.04,1.04 c-0.54,0-0.98-0.41-1.04-0.93L0,19.88V17.8c0-2.8,2.21-5.09,4.99-5.2h0.22h8.33V12.58z',
    viewBox: '0 0 25 21',
  },
  [SessionIconType.Upload]: {
    path:
      'M380.032,133.472l-112-128C264.992,2.016,260.608,0,256,0c-4.608,0-8.992,2.016-12.032,5.472l-112,128 c-4.128,4.736-5.152,11.424-2.528,17.152C132.032,156.32,137.728,160,144,160h64v208c0,8.832,7.168,16,16,16h64	c8.832,0,16-7.168,16-16V160h64c6.272,0,11.968-3.648,14.56-9.376C385.152,144.896,384.192,138.176,380.032,133.472z M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z',
    viewBox: '0 0 512 512',
  },
  [SessionIconType.Warning]: {
    path:
      'M243.225,333.382c-13.6,0-25,11.4-25,25s11.4,25,25,25c13.1,0,25-11.4,24.4-24.4 C268.225,344.682,256.925,333.382,243.225,333.382z M474.625,421.982c15.7-27.1,15.8-59.4,0.2-86.4l-156.6-271.2c-15.5-27.3-43.5-43.5-74.9-43.5s-59.4,16.3-74.9,43.4 l-156.8,271.5c-15.6,27.3-15.5,59.8,0.3,86.9c15.6,26.8,43.5,42.9,74.7,42.9h312.8 C430.725,465.582,458.825,449.282,474.625,421.982z M440.625,402.382c-8.7,15-24.1,23.9-41.3,23.9h-312.8	c-17,0-32.3-8.7-40.8-23.4c-8.6-14.9-8.7-32.7-0.1-47.7l156.8-271.4c8.5-14.9,23.7-23.7,40.9-23.7c17.1,0,32.4,8.9,40.9,23.8 l156.7,271.4C449.325,369.882,449.225,387.482,440.625,402.382z M237.025,157.882c-11.9,3.4-19.3,14.2-19.3,27.3c0.6,7.9,1.1,15.9,1.7,23.8c1.7,30.1,3.4,59.6,5.1,89.7 c0.6,10.2,8.5,17.6,18.7,17.6c10.2,0,18.2-7.9,18.7-18.2c0-6.2,0-11.9,0.6-18.2c1.1-19.3,2.3-38.6,3.4-57.9 c0.6-12.5,1.7-25,2.3-37.5c0-4.5-0.6-8.5-2.3-12.5C260.825,160.782,248.925,155.082,237.025,157.882z',
    viewBox: '0 0 486.463 486.463',
  },
};
