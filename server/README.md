## SERVER SIDE 

Dear Issa and Jamilya welcome :) 

#### These are the dependencies you are supposed to have in your node_modules package.json after installing: npm i 
- bcrypt
- cloudinary
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- multer-storage-cloudinary

possible libraries that can be added later:
- nodemailer
- joi

## Plant model
- should include: name, type, latin name, categories (kingdom, class, family), description (user gets to make this part how they like), favorites (no need to connect to user, since each user have their own herbarium), image upload 
**refer to image ![Lilly_of_the_Valley](Lilly_of_the_Valley.png)** as inspiration (description allows for more information based on what the User wants)

## User model
to include themes:
- theme: { type: String, enum: ['theme1', 'theme2', 'theme3'], default: 'theme1' } - Later replace with actual theme names
 
## Functionalities
- CRUD for plants and user
- search 
- filter for categories

# NOTICE: type: module already added in package.json for further additional production /testing changes come later if we need
Another notice: Please do not forget to add .env

- We need to set MongoDB so choose who wants to have the database
- Cloudinary as well
