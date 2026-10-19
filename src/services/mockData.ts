import {
  TempleInfo,
  TempleContact,
  Aarti,
  EventItem,
  Notice,
  Album,
  Photo,
  VideoItem,
  Member,
  DonationInfo,
} from '../types';

export const initialTempleInfo: TempleInfo = {
  name: {
    hi: 'श्री ओंकारेश्वर महादेव हनुमान मंदिर',
    en: 'Shri Onkareshwar Mahadev Hanuman Mandir',
  },
  history: {
    hi: 'श्री ओंकारेश्वर महादेव हनुमान मंदिर गांव का एक प्राचीन और अत्यंत पूजनीय आध्यात्मिक केंद्र है। यहाँ सदियों से भगवान शिव और संकटमोचन हनुमान जी की नित्य सेवा व उपासना की परंपरा निरंतर चली आ रही है। प्रतिवर्ष महाशिवरात्रि, हनुमान जयंती और श्रावण मास में यहाँ भव्य अनुष्ठान व धार्मिक उत्सव आयोजित किए जाते हैं।',
    en: 'Shri Onkareshwar Mahadev Hanuman Mandir is a sacred and historic spiritual center of the village. For generations, daily prayers and worship of Lord Shiva and Hanuman Ji have been performed with deep devotion. Annual festivals like Maha Shivratri, Hanuman Jayanti, and the holy Shravan month are celebrated with grand rituals.',
  },
  deities: [
    {
      name: { hi: 'श्री ओंकारेश्वर महादेव (शिवलिंग)', en: 'Shri Onkareshwar Mahadev' },
      description: {
        hi: 'समस्त कामनाओं को पूर्ण करने वाले परम कल्याणकारी देवाधिदेव महादेव।',
        en: 'The auspicious Supreme Lord Shiva who fulfills the righteous wishes of devotees.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1609137144822-127956402373?w=800&q=80',
    },
    {
      name: { hi: 'संकटमोचन श्री हनुमान जी', en: 'Sankatmochan Shri Hanuman Ji' },
      description: {
        hi: 'भक्तों के संकटों का नाश करने वाले परम पराक्रमी पवनसुत।',
        en: 'The mighty protector and embodiment of strength, wisdom, and selfless devotion.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&q=80',
    },
    {
      name: { hi: 'माँ जगदम्बा भवानी', en: 'Maa Jagdamba Bhavani' },
      description: {
        hi: 'समस्त सृष्टि की जननी और मंगलदायिनी आदिशक्ति।',
        en: 'The Divine Mother and source of universal spiritual energy and benevolence.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&q=80',
    },
  ],
  timings: [
    {
      label: { hi: 'प्रातः पट खुलना एवं मंगला दर्शन', en: 'Morning Temple Opens & Mangala Darshan' },
      from: '05:30',
      to: '12:00',
    },
    {
      label: { hi: 'दोपहर विश्राम (पट बंद)', en: 'Afternoon Rest (Doors Closed)' },
      from: '12:00',
      to: '16:00',
    },
    {
      label: { hi: 'सायं दर्शन एवं संध्या आरती', en: 'Evening Darshan & Sandhya Aarti' },
      from: '16:00',
      to: '21:30',
    },
  ],
  address: {
    hi: 'मुख्य मंदिर मार्ग, ओंकारेश्वर महादेव प्रांगण, ग्राम एवं डाक, जिला - [नाम]',
    en: 'Main Mandir Road, Onkareshwar Mahadev Complex, Village & Post, District - [Name]',
  },
  location: {
    lat: 22.2452,
    lng: 76.1511,
  },
  facilities: [
    { hi: 'विशाल सत्संग एवं प्रार्थना भवन', en: 'Spacious Satsang & Prayer Hall' },
    { hi: 'शुद्ध पेयजल एवं चरणामृत व्यवस्था', en: 'Pure Drinking Water Facility' },
    { hi: 'जूता-चप्पल स्टैंड (निःशुल्क सेवा)', en: 'Free Footwear Stand' },
    { hi: 'दिव्यांगों एवं वरिष्ठ जनों हेतु सुगम रैंप', en: 'Wheelchair & Elder Accessible Ramp' },
    { hi: 'नित्य एवं विशेष अवसरों पर अन्नक्षेत्र (भंडारा)', en: 'Daily Prasad & Community Kitchen (Bhandara)' },
    { hi: 'वाहन पार्किंग सुविधा', en: 'Safe Vehicle Parking Area' },
  ],
  heroImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80',
  updatedAt: new Date().toISOString(),
};

export const initialAartis: Aarti[] = [
  {
    id: 'aarti-1',
    title: { hi: 'मंगला आरती', en: 'Mangala Aarti' },
    time: '06:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    lyrics: {
      hi: `जय ओंकारा, ॐ जय ओंकारा ।
ब्रह्मा विष्णु सदाशिव अर्द्धांगी धारा ॥ ॐ जय ओंकारा...
एकानन चतुरानन पंचानन राजे ।
हंसासन गरुड़ासन वृषवाहन साजे ॥ ॐ जय ओंकारा...
दो भुज चार चतुर्भुज दस भुज अति सोहे ।
तीनों रूप निरखता त्रिभुवन जन मोहे ॥ ॐ जय ओंकारा...
अक्षमाला बनमाला रुण्डमाला धारी ।
त्रिपुरारी कंसारी कर माला धारी ॥ ॐ जय ओंकारा...
श्वेताम्बर पीताम्बर बाघम्बर अंगे ।
सनकादिक गरुड़ादिक भूतादिक संगे ॥ ॐ जय ओंकारा...
कर के मध्य कमंडलु चक्र त्रिशूल धरता ।
जगकर्ता जगभर्ता जगसंहारकर्ता ॥ ॐ जय ओंकारा...
ब्रह्मा विष्णु सदाशिव जानत अविवेका ।
प्रणवाक्षर में शोभित ये तीनों एका ॥ ॐ जय ओंकारा...
काशी में विश्वनाथ विराजे नंदी ब्रह्मचारी ।
नित उठ दर्शन पावत महिमा अति भारी ॥ ॐ जय ओंकारा...
त्रिगुण शिवजी की आरती जो कोई नर गावे ।
कहत शिवानन्द स्वामी मनवांछित फल पावे ॥ ॐ जय ओंकारा...`,
      en: `Jai Omkara, Om Jai Omkara.
Brahma Vishnu Sadashiv Ardhangi Dhara. Om Jai Omkara...
Ekanan Chaturanan Panchanan Raje.
Hansasan Garudasan Vrishavahan Saje. Om Jai Omkara...
Two arms, four arms, ten arms most radiant,
Beholding all three forms, all three worlds are enchanted. Om Jai Omkara...`,
    },
    order: 1,
    active: true,
  },
  {
    id: 'aarti-2',
    title: { hi: 'भोग आरती', en: 'Bhog Aarti' },
    time: '11:45',
    days: [0, 1, 2, 3, 4, 5, 6],
    lyrics: {
      hi: `कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ।
सदा बसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥

भगवान शिव को पवित्र नैवेद्य एवं फल-प्रसाद अर्पण करते हुए भोग आरती की जाती है। इस समय महादेव को शुद्ध सात्विक भोग अर्पित किया जाता है।`,
      en: `Karpuragauram Karunavataram Sansarasaram Bhujagendraharam.
Sada Vasantam Hridayaravinde Bhavam Bhavanisahitam Namami.

Bhog Aarti is offered at midday while dedicating holy food, fresh sweets, and fruits to the Deity.`,
    },
    order: 2,
    active: true,
  },
  {
    id: 'aarti-3',
    title: { hi: 'संध्या महाआरती', en: 'Sandhya Maha Aarti' },
    time: '19:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    lyrics: {
      hi: `आरती कीजै हनुमान लला की । दुष्ट दलन रघुनाथ कला की ॥
जाके बल से गिरिवर कांपे । रोग दोष जाके निकट न झांपे ॥
अंजनि पुत्र महाबलदाई । संतन के प्रभु सदा सहाई ॥
दे बीरा रघुनाथ पठाए । लंका जारि सीय सुधि लाए ॥
लंका सो कोट समुद्र सी खाई । जात पवनसुत बार न लाई ॥
लंका जारि असुर संहारे । सियारामजी के काज संवारे ॥
लक्ष्मण मूर्छित पड़े सकारे । आनि संजीवन प्रान उबारे ॥
पैठि पाताल तोरि जम-कारे । अहिरावण की भुजा उखारे ॥
बाएं भुजा असुर दल मारे । दाहिने भुजा संत जन तारे ॥
सुर नर मुनि जन आरती उतारें । जय जय जय हनुमान उचारें ॥
कंचन थार कपूर लौ छाई । आरति करत अंजना माई ॥
जो हनुमानजी की आरती गावे । बसि बैकुंठ परम पद पावे ॥`,
      en: `Aarti Keeje Hanuman Lala Ki, Dusht Dalan Raghunath Kala Ki.
Jake Bal Se Girivar Kampe, Rog Dosh Jake Nikat Na Jhampe.
Anjani Putra Mahabal Dayee, Santan Ke Prabhu Sada Sahayee.
Whoever sings this holy hymn to Lord Hanuman attains the highest abode of peace and grace.`,
    },
    order: 3,
    active: true,
  },
  {
    id: 'aarti-4',
    title: { hi: 'शयन आरती', en: 'Shayan Aarti' },
    time: '21:15',
    days: [0, 1, 2, 3, 4, 5, 6],
    lyrics: {
      hi: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे ।
भक्त जनों के संकट दास जनों के संकट, क्षण में दूर करे ॥ ॐ जय जगदीश हरे...
जो ध्यावे फल पावे दुःख बिनसे मन का ।
सुख संपत्ति घर आवे कष्ट मिटे तन का ॥ ॐ जय जगदीश हरे...
मात पिता तुम मेरे शरण गहूं किसकी ।
तुम बिन और न दूजा आस करूं जिसकी ॥ ॐ जय जगदीश हरे...`,
      en: `Om Jai Jagadish Hare, Swami Jai Jagadish Hare.
Bhakta Janon Ke Sankat, Kshan Mein Door Kare. Om Jai Jagadish Hare...`,
    },
    order: 4,
    active: true,
  },
];

export const initialNotices: Notice[] = [
  {
    id: 'notice-1',
    title: {
      hi: 'श्रावण मास विशेष रुद्राभिषेक एवं कावड़ यात्रा स्वागत',
      en: 'Shravan Month Special Rudrabhishek & Kawad Yatra Reception',
    },
    body: {
      hi: 'सभी ग्रामवासियों एवं श्रद्धालुओं को सूचित किया जाता है कि आगामी पवित्र श्रावण मास के प्रत्येक सोमवार को प्रातः 7 बजे से सामूहिक महारुद्राभिषेक संपन्न होगा। कावड़ यात्रियों के जलपान व विश्राम की समुचित व्यवस्था मंदिर प्रांगण में की गई है। इच्छुक भक्त सेवा कार्य हेतु समिति से संपर्क करें।',
      en: 'All villagers and devotees are informed that grand Rudrabhishek will take place every Monday of the holy Shravan month at 7 AM. Rest and refreshment arrangements have been organized for visiting Kawad pilgrims in the temple courtyard.',
    },
    pinned: true,
    createdAt: new Date().toISOString(),
    pushSent: true,
    createdBy: 'समिति व्यवस्थापक',
  },
  {
    id: 'notice-2',
    title: {
      hi: 'आगामी मंगलवार को सुंदरकांड पाठ एवं भंडारा',
      en: 'Sunderkand Recitation & Bhandara this Tuesday',
    },
    body: {
      hi: 'आगामी मंगलवार को सायं 5 बजे से संकटमोचन हनुमान जी के सम्मुख संगीतमय सुंदरकांड पाठ का आयोजन होगा। पाठ उपरांत महाआरती एवं महाप्रसाद (भंडारा) वितरण रहेगा। सभी सपरिवार सादर आमंत्रित हैं।',
      en: 'Musical Sunderkand recital will be held this Tuesday at 5 PM in front of Shri Hanuman Ji, followed by Maha Aarti and distribution of Mahaprasad.',
    },
    pinned: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    pushSent: false,
    createdBy: 'मंदिर समिति',
  },
];

export const initialEvents: EventItem[] = [
  {
    id: 'event-1',
    title: {
      hi: 'महाशिवरात्रि महापर्व महोत्सव 2027',
      en: 'Maha Shivratri Grand Mahotsav 2027',
    },
    description: {
      hi: 'भगवान ओंकारेश्वर महादेव का चतुष्प्रहर महाभिषेक, अखंड ॐ नमः शिवाय संकीर्तन, भव्य फूल बंगला श्रृंगार तथा रात्रि भर भजन संध्या।',
      en: 'Four-phase night-long continuous Abhishek of Lord Onkareshwar Mahadev, unbroken Om Namah Shivaya chant, flower decor and devotional hymns.',
    },
    startAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 6).toISOString(),
    location: {
      hi: 'मुख्य मंदिर प्रांगण',
      en: 'Main Temple Complex',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    pinned: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'event-2',
    title: {
      hi: 'श्री हनुमान जन्मोत्सव शोभायात्रा',
      en: 'Shri Hanuman Janmotsav Grand Procession',
    },
    description: {
      hi: 'हनुमान जयंती के पावन अवसर पर प्रातः हवन, दोपहर में विशाल शोभायात्रा एवं सायंकाल 108 दीपों से दिव्य महाआरती।',
      en: 'On the sacred occasion of Hanuman Jayanti, morning Havan ceremony, grand afternoon procession, and 108-lamp evening Deepaarti.',
    },
    startAt: new Date(Date.now() + 86400000 * 18).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 18 + 3600000 * 6).toISOString(),
    location: {
      hi: 'मंदिर प्रांगण एवं ग्राम परिक्रमा',
      en: 'Temple Courtyard & Village Procession Route',
    },
    imageUrl: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&q=80',
    pinned: false,
    createdAt: new Date().toISOString(),
  },
];

export const initialAlbums: Album[] = [
  {
    id: 'album-1',
    title: { hi: 'महाशिवरात्रि श्रृंगार दर्शन', en: 'Maha Shivratri Shringar Darshan' },
    coverUrl: 'https://images.unsplash.com/photo-1609137144822-127956402373?w=800&q=80',
    date: new Date().toISOString(),
    count: 4,
    order: 1,
  },
  {
    id: 'album-2',
    title: { hi: 'हनुमान जन्मोत्सव एवं हवन', en: 'Hanuman Janmotsav & Havan' },
    coverUrl: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&q=80',
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    count: 3,
    order: 2,
  },
];

export const initialPhotos: Record<string, Photo[]> = {
  'album-1': [
    {
      id: 'p1-1',
      url: 'https://images.unsplash.com/photo-1609137144822-127956402373?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1609137144822-127956402373?w=400&q=80',
      caption: { hi: 'दिव्य भस्म एवं बिल्वपत्र श्रृंगार', en: 'Sacred Bhasma & Bilvapatra Shringar' },
      order: 1,
    },
    {
      id: 'p1-2',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
      caption: { hi: 'संध्याकालीन दीप प्रज्ज्वलन एवं महाआरती', en: 'Evening Deepotsav & Maha Aarti' },
      order: 2,
    },
    {
      id: 'p1-3',
      url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=400&q=80',
      caption: { hi: 'मंदिर शिखर एवं ध्वजारोहण', en: 'Temple Sanctum Spire & Holy Flag' },
      order: 3,
    },
    {
      id: 'p1-4',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
      caption: { hi: 'भक्तों का दर्शन एवं कीर्तन प्रवाह', en: 'Devotees offering prayers and kirtan' },
      order: 4,
    },
  ],
  'album-2': [
    {
      id: 'p2-1',
      url: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=400&q=80',
      caption: { hi: 'श्री हनुमान जी का सिंदूरी चोला श्रृंगार', en: 'Sindoor Chola Shringar of Hanuman Ji' },
      order: 1,
    },
    {
      id: 'p2-2',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80',
      thumbUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
      caption: { hi: 'पूर्णाहुति एवं महाप्रसाद वितरण', en: 'Purnahuti of Yajna & Mahaprasad' },
      order: 2,
    },
  ],
};

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: { hi: 'प्रातःकालीन मंगला आरती एवं स्तुति दर्शन', en: 'Morning Mangala Aarti & Stuti Darshan' },
    youtubeId: 'WChn56-rBf4',
    category: 'aarti',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-2',
    title: { hi: 'महाशिवरात्रि महोत्सव - भव्य जल अभिषेक', en: 'Maha Shivratri Grand Jal Abhishek' },
    youtubeId: 'b_C1fK492s8',
    category: 'festival',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'vid-3',
    title: { hi: 'श्रीमद् शिव महापुराण कथा अमृत वचन', en: 'Shiv Mahapuran Katha Amrit Pravachan' },
    youtubeId: '1mQn4e0078k',
    category: 'katha',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

export const initialMembers: Member[] = [
  {
    id: 'mem-1',
    name: { hi: 'श्री रामेश्वर प्रसाद जी', en: 'Shri Rameshwar Prasad Ji' },
    role: { hi: 'अध्यक्ष, मंदिर प्रबंध समिति', en: 'President, Temple Management Committee' },
    phone: '+91 98765 43210',
    showPhone: true,
    order: 1,
  },
  {
    id: 'mem-2',
    name: { hi: 'पं. देवकीनंदन शास्त्री जी', en: 'Pt. Devkinandan Shastri Ji' },
    role: { hi: 'मुख्य पुजारी जी', en: 'Head Priest' },
    phone: '+91 98765 43211',
    showPhone: true,
    order: 2,
  },
  {
    id: 'mem-3',
    name: { hi: 'श्री जगदीश चंद्र वर्मा', en: 'Shri Jagdish Chandra Verma' },
    role: { hi: 'सचिव एवं कोष व्यवस्थापक', en: 'Secretary & Treasurer' },
    phone: '+91 98765 43212',
    showPhone: true,
    order: 3,
  },
];

export const initialDonationInfo: DonationInfo = {
  trustName: 'श्री ओंकारेश्वर महादेव मंदिर सेवा ट्रस्ट (पंजीकृत)',
  registrationNote: 'पंजीकरण क्रमांक: ट्रस्ट/108/2012 | धारा 80G के अंतर्गत छूट मान्य',
  externalDonateUrl: 'https://onkareshwar-mahadev-mandir.web.app/donate',
  receiptContact: '+91 98765 43212 (कोषाध्यक्ष)',
  purposes: [
    {
      title: { hi: 'नित्य अन्नक्षेत्र एवं प्रसाद सेवा', en: 'Daily Bhandara & Prasad Seva' },
      description: {
        hi: 'मंदिर में आने वाले सभी साधु-संतों, यात्रियों और भक्तों हेतु नित्य निःशुल्क भोजन प्रसादी की व्यवस्था।',
        en: 'Providing free daily food prasad to visiting pilgrims, saints, and devotees.',
      },
    },
    {
      title: { hi: 'मंदिर जीर्णोद्धार एवं परिसर विकास', en: 'Mandir Renovation & Development' },
      description: {
        hi: 'मंदिर के प्राचीन गर्भगृह संरक्षण, परिक्रमा पथ निर्माण और सत्संग भवन का विस्तार।',
        en: 'Preservation of ancient sanctum, parikrama pathway paving, and assembly hall construction.',
      },
    },
    {
      title: { hi: 'गौशाला एवं पर्यावरण संरक्षण', en: 'Gaushala & Greenery Care' },
      description: {
        hi: 'मंदिर से सम्बद्ध नंदी गौसेवा, गोवंश का भरण-पोषण एवं परिसर में तुलसी व कदंब वाटिका संवर्धन।',
        en: 'Care and nourishment for sacred cows at the temple gaushala, and planting medicinal trees.',
      },
    },
  ],
  summaries: [
    {
      month: '2026-09',
      income: 142500,
      spend: 118200,
      note: {
        hi: 'श्रावण मास अनुष्ठान, अन्नक्षेत्र एवं परिसर रंग-रोगन व्यय। शेष राशि स्थायी कोष में सुरक्षित।',
        en: 'Expenditure on Shravan rituals, community kitchen, and whitewash. Balance saved to trust reserve.',
      },
    },
    {
      month: '2026-08',
      income: 98000,
      spend: 84500,
      note: {
        hi: 'नित्य पूजा, दीपक-तेल एवं पुजारी मानदेय।',
        en: 'Daily worship supplies, oil, lighting, and priest honorary stipend.',
      },
    },
  ],
};

export const initialTempleContact: TempleContact = {
  phones: [
    { label: 'मुख्य कार्यालय (कार्यालय समय)', number: '+91 98765 43210' },
    { label: 'पुजारी कक्ष (पूजा समय)', number: '+91 98765 43211' },
  ],
  whatsapp: '+919876543210',
  email: 'onkareshwar.mandir.trust@gmail.com',
  mapUrl: 'https://maps.google.com/?q=22.2452,76.1511',
  addressText: {
    hi: 'श्री ओंकारेश्वर महादेव हनुमान मंदिर परिसर, मुख्य ग्राम चौराहा',
    en: 'Shri Onkareshwar Mahadev Hanuman Mandir Complex, Main Village Junction',
  },
};
