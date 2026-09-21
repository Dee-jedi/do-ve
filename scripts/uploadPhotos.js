const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const fs = require("fs");
const path = require("path");

// Ensure you have placed the service account JSON in the root
const serviceAccountPath = path.join(__dirname, "..", "service account key.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("Error: service account key.json not found in the root folder.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "dorcas-90019.firebasestorage.app",
});

const bucket = getStorage().bucket();
const db = getFirestore();

// Path to the local photos
const localPixDir = path.join(__dirname, "..", "..", "dorcas-victor pix");

if (!fs.existsSync(localPixDir)) {
  console.error("Error: Directory 'dorcas-victor pix' not found at", localPixDir);
  process.exit(1);
}

// Map the set names to their stories and orders
const setMap = {
  "1st set": {
    order: 1,
    title: "A Match Made in Core Subjects",
    story: `Victor and Dorcas met in August of 2022 at Beulah International Schools where he taught Mathematics and she had just been employed fresh-off NYSC to be the English teacher. 

They started talking when Dorcas saw Victor's laptop screen saver featuring him on the backup mic in church, asked him what church he went to and they discovered that they went to the same church (although Victor worshipped at the headquarters while Dorcas worshipped at a branch.)

The rest, they say, is history`,
  },
  "2nd set": {
    order: 2,
    title: "A Cash-Crunch Love",
    story: `Dorcas tried to persuade Victor to come to her branch especially when she discovered that he could play a number of musical instruments and the church needed his services.

"I don't like small branches; everybody will know you. I don't want anybody to know me." Victor argued.

Dorcas said, "Hold my drink"...

In a matter of months (thanks to the cash crunch of 2023 where he could no longer get cash to pay to the headquarters, to the glory of God.😂) he was answering questions in Sunday school, playing the keyboard, drums and the bass guitar`,
  },
  "3rd set": {
    order: 3,
    title: "",
    story: `It was at this point that he realised that this Akwa Ibom woman had him a chokehold.`,
  },
  "4th set": {
    order: 4,
    title: "",
    story: `Today, you have come to witness what started as an attempt to recruit an instrumentalist for the church, years of friendship and partnership.

Victor was just like a brother to Dorcas. Yes. That's where all great relationships start.`,
  },
  "5th set": {
    order: 5,
    title: "",
    story: `Final set of photos.`,
  },
};

async function uploadPhotos() {
  const folders = fs.readdirSync(localPixDir).filter((file) => {
    return fs.statSync(path.join(localPixDir, file)).isDirectory();
  });

  for (const folderName of folders) {
    if (!setMap[folderName]) {
      console.log(`Skipping unknown folder: ${folderName}`);
      continue;
    }

    console.log(`Processing ${folderName}...`);
    const setInfo = setMap[folderName];
    const folderPath = path.join(localPixDir, folderName);
    const files = fs.readdirSync(folderPath);

    const imageUrls = [];

    for (const file of files) {
      if (file.startsWith(".")) continue; // Skip hidden files

      const filePath = path.join(folderPath, file);
      const destination = `love_story/${folderName}/${file}`;
      const fileRef = bucket.file(destination);

      const [exists] = await fileRef.exists();

      if (exists) {
        console.log(`  Skipping upload for ${file} (already exists)...`);
      } else {
        console.log(`  Uploading ${file}...`);
        await bucket.upload(filePath, {
          destination,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
      }

      // Make the file publicly accessible
      await fileRef.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
      imageUrls.push(publicUrl);
    }

    console.log(`  Uploaded ${imageUrls.length} images for ${folderName}.`);

    // Create a document in Firestore
    const docRef = db.collection("love_story").doc(`set_${setInfo.order}`);
    await docRef.set({
      setId: folderName,
      order: setInfo.order,
      title: setInfo.title,
      story: setInfo.story,
      images: imageUrls,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log(`  Saved metadata to Firestore for ${folderName}.`);
  }

  console.log("All photos uploaded successfully!");
}

uploadPhotos().catch(console.error);
