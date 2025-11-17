import TransformationIMG from '@/assets/images/Tranformaciones-son-goku-dragon-ball.jpg'
import PlanetIMG from '@/assets/images/Planeta_Vegeta_en_Dragon_Ball_Super_Broly.webp'
import CharacterIMG from '@/assets/images/mejores-personajes-dragon-ball.webp'


const ExplorerData = [
    {
        id:1,
        name: 'Personajes',
        imageSrc: CharacterIMG,
        text: 'Descubra Los mejores Personajes Dragon Ball',
        route: './characters',
    },
    {
        id: 2,
        name: 'Planetas',
        imageSrc: PlanetIMG,
        text: 'Descubra Las mejores Planetas Dragon Ball',
        route: '',
    },
    {
        id:3,
        name: 'Transformaciones',
        imageSrc: TransformationIMG,
        text: 'Descubra Los Personajes mas poderosos de Dragon Ball',
        route: '',
    }
]

export default ExplorerData;