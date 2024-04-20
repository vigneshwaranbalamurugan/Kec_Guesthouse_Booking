import ITP1 from '../assets/ITP-1.png'
import MGSH from '../assets/mgsh.jpg'
import KCC from '../assets/conv.jpg'
import MJA from '../assets/maharaja.jpg'
import CKPH from '../assets/CKPH.jpg'
import SRKH from '../assets/SRKH.jpg'

const halldept = [
    {
        id: 1,
        halls: [
            {
                id:11,
                name: 'Srinivasa Ramanujan Hall',
                fan: 'Available',
                ac: 'Non-AC',
                Whiteboard: 'Available',
                Projector: 'Available',
                Capacity: 300,
                thumbnail: ITP1,
            },
           
        ]
        
    },
    {
        id: 2,
        halls: [
            {
                id:21,
                name: 'Mahatma Gandhi Seminar Hall',
                fan: 'Not Available',
                ac: 'Available',
                Whiteboard: 'Available',
                Projector: 'Available',
                Capacity: 300,
                thumbnail: MGSH,
            },
           
        ]
    },
    {
        id: 3,
        halls: [
            {
                id:31,
                name: 'Convention Center',
                fan: 'Not Available',
                ac: 'Available',
                Whiteboard: 'Not Available',
                Projector: 'Available',
                Capacity: 4000,
                thumbnail: KCC,
            },
            {
                id:32,
                name: 'Maharaja Auditorium',
                fan: 'Available',
                ac: 'Available',
                Whiteboard: 'Available',
                Projector: 'Available',
                Capacity: 600,
                thumbnail: MJA,
            },
        ]
    },
    {
        id: 4,
        halls: [
            {
                id:41,
                name: 'Sarvepalli Radhakrishnan Seminar Hall',
                fan: 'Not Available',
                ac: 'Available',
                Whiteboard: 'Available',
                Projector: 'Available',
                Capacity: 120,
                thumbnail: SRKH,
            },
           
        ]
    },
    {
        id: 5,
        halls: [
            {
                id:51,
                name: 'C K Prahalad Hall',
                fan: 'Not Available',
                ac: 'Available',
                Whiteboard: 'Available',
                Projector: 'Available',
                Capacity: 600,
                thumbnail: CKPH,
            },
           
        ]
    },
];

export default halldept;