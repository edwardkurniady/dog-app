'use strict';

const breeds = [
  'Akita',
  'Alaskan Malamute',
  'American Bully',
  'American Cocker Spaniel',
  'American Pit Bull Terrier',
  'Basenji',
  'Basset Hound',
  'Beagle',
  'Belgian Malinois',
  'Bernese Mountain Dog',
  'Bichon Frise',
  'Border Collie',
  'Bull Terrier',
  'Bulldog',
  'Bullmastiff',
  'Cane Corso',
  'Cavalier King Charles Spaniel',
  'Chihuahua',
  'Chinese Shar-pei',
  'Chow Chow',
  'Doberman Pinscher',
  'Dutch Shepherd',
  'French Bulldog',
  'Golden Retriever',
  'Great Dane',
  'Herder / German Shepherd',
  'Jack Russell Terrier',
  'Jagdterrier / German Hunting Terrier',
  'Kintamani',
  'Labrador Retriever',
  'Maltese',
  'Miniature Schnauzer',
  'Mixed Breed / Campuran',
  'Pekingese',
  'Pembroke Welsh Corgi',
  'Pomeranian',
  'Poodle',
  'Pug',
  'Rottweiler',
  'Saint Bernard',
  'Samoyed',
  'Scottish Terrier',
  'Shih Tzu',
  'Siberian Husky',
  'Tekel / Dachshund',
  'West Highland White Terrier',
  'Yorkshire Terrier',
];

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(
      'Breeds',
      breeds.map(breed => {
        return {
          name: breed,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      {},
    );
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete('Breeds', null, {});
  }
};
