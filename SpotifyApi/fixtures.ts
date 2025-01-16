import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Composition from "./models/Composition";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('compositions');
    } catch(e) {
        console.log('Collections were not presents, skipping drop');
    }

    const [Logic, TwentyOnePilots] = await Artist.create(
        {
            name: 'Logic',
            artistImage: 'fixtures/logic.png'
        },
        {
            name: 'TwentyOnePilots',
            artistImage: 'fixtures/Twentyonepilots.png'
        }
    );

    const [UnderPressure, Everybody, Blurryface, Trench] = await Album.create(
        {
            artist: Logic._id,
            name: 'Under Pressure',
            released: 2014,
            albumImage: 'fixtures/LogicUnderPressure.png',
        },
        {
            artist: Logic._id,
            name: 'Everybody',
            released: 2017,
            albumImage: 'fixtures/LogicEverybody.png',
        },
        {
            artist: TwentyOnePilots._id,
            name: 'Blurryface',
            released: 2015,
            albumImage: 'fixtures/BlurryfaceTwentyOnePilots.png',
        },
        {
            artist: TwentyOnePilots._id,
            name: 'Trench',
            released: 2018,
            albumImage: 'fixtures/TrenchTwentyOnePilots.png',
        }
    );

    await Composition.create(
        {
            album: UnderPressure._id,
            name: 'Soul Food',
            timing: '4:53'
        },
        {
            album: UnderPressure._id,
            name: 'Bounce',
            timing: '4:05'
        },
        {
            album: Everybody._id,
            name: 'Everybody',
            timing: '2:42'
        },
        {
            album: Everybody._id,
            name: 'Ink Blot',
            timing: '2:36'
        },
        {
            album: Blurryface._id,
            name: 'Heavydirtysoul',
            timing: '3:55'
        },
        {
            album: Blurryface._id,
            name: 'Ride',
            timing: '3:35'
        },
        {
            album: Trench._id,
            name: 'Chlorine',
            timing: '5:25'
        },
        {
            album: Trench._id,
            name: 'Levitate',
            timing: '2:26'
        }
    );

    await User.create(
        {
            username: 'Marsel',
            password: '8686',
            token: randomUUID()
        }
    )
    await db.close();
};

run().catch(console.error);