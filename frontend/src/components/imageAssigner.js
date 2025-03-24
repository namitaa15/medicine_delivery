import m1 from '../assets/m1.png';
import m2 from '../assets/m2.png';
import m3 from '../assets/m3.png';
import m4 from '../assets/m4.png';
import m5 from '../assets/m5.png';
import m6 from '../assets/m6.png';
import m7 from '../assets/m7.png';
import m8 from '../assets/m8.png';
import m9 from '../assets/m9.png';

const medicineImages = [m1, m2, m3, m4, m5, m6, m7, m8, m9];

export const assignImageToMedicines = (medicineList) => {
  // Shuffle the medicines so image distribution is random
  const shuffled = [...medicineList].sort(() => Math.random() - 0.5);

  // Assign images evenly
  const updatedList = shuffled.map((medicine, index) => ({
    ...medicine,
    image: medicineImages[index % medicineImages.length],
  }));

  return updatedList;
};
