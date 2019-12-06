import noPhoto from '../img/noPhoto.png';

export default function(refer){
  return Promise.resolve({ email: 'test@example.com', photoUrl: noPhoto });
}
