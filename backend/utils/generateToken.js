import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (res,userId) => {
const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallbackSecret', {
  expiresIn: '30d',
});

res.cookie('jwt',token,{
    httpOnly :true,
    secure:process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge:30 * 24 * 60 * 60 * 1000
})
}
 export default generateToken;