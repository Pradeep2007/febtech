# MediCare Solutions - Medical Website

A comprehensive ReactJS medical website built with TailwindCSS and Firebase, featuring a dynamic product catalog, admin dashboard, and responsive design.

## Features

### 🏥 Core Features

- **Splash Screen**: Animated loading screen with company branding
- **Hero Section**: Dynamic landing page with product categories and compliance info
- **About Section**: Company history, mission, vision, team profiles, and certifications
- **Product Catalog**: Filterable product grid with admin management capabilities
- **Compliance & Licensing**: Regulatory information and certifications
- **Partners & Clientele**: Partner showcase and customer testimonials
- **FAQ Section**: Categorized frequently asked questions
- **Contact Form**: Interactive contact form with multiple inquiry types

### 🛠️ Technical Features

- **React Router**: Multi-page navigation
- **TailwindCSS**: Responsive design with custom color palette
- **Firebase Integration**: Real-time database for products, testimonials, and partners
- **Framer Motion**: Smooth animations and transitions
- **Admin Dashboard**: Product management (add, edit, delete)
- **Responsive Design**: Mobile-first approach
- **Form Handling**: Contact forms with validation
- **Toast Notifications**: User feedback system

### 🎨 Design Features

- **Custom Color Palette**:
  - Teal Prime: #00897B
  - Light Teal: #80CBC4
  - Orange: #FF7043
  - Blue: #4467A3
  - Light Gray: #FAFAFA
- **Modern UI**: Clean, professional medical industry design
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects and micro-interactions

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd medical-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config to `src/firebase/config.js`
   - Replace the placeholder values with your actual Firebase configuration

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Firebase Setup

### 1. Create Firestore Collections

Create the following collections in your Firestore database:

#### Products Collection

```javascript
{
  name: "string",
  category: "medicines|equipment|diagnostics|surgical|consumables",
  sku: "string",
  price: "number",
  description: "string",
  specifications: "object",
  inStock: "boolean",
  stockQuantity: "number",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

#### Testimonials Collection

```javascript
{
  name: "string",
  position: "string",
  company: "string",
  content: "string",
  rating: "number",
  image: "string",
  createdAt: "timestamp"
}
```

#### Partners Collection

```javascript
{
  name: "string",
  logo: "string",
  description: "string",
  category: "string",
  partnershipYears: "number"
}
```

#### Team Collection

```javascript
{
  name: "string",
  position: "string",
  image: "string",
  bio: "string"
}
```

### 2. Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections
    match /{document=**} {
      allow read: if true;
    }

    // Allow write access for authenticated users (admin)
    match /products/{document} {
      allow write: if request.auth != null;
    }

    match /testimonials/{document} {
      allow write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── SplashScreen.js      # Loading screen
│   ├── Navbar.js            # Navigation component
│   ├── Hero.js              # Landing page hero
│   ├── About.js             # About page
│   ├── Products.js          # Product catalog
│   ├── ProductModal.js      # Product management modal
│   ├── Compliance.js        # Compliance page
│   ├── Partners.js          # Partners page
│   ├── FAQ.js               # FAQ page
│   ├── Contact.js           # Contact page
│   └── Footer.js            # Footer component
├── firebase/
│   ├── config.js            # Firebase configuration
│   └── firestore.js         # Firestore operations
├── App.js                   # Main app component
├── index.js                 # Entry point
└── index.css                # Global styles
```

## Usage

### Admin Features

1. **Enable Admin Mode**: Click "Admin Mode" button on the products page
2. **Add Product**: Click "Add Product" button to open the product modal
3. **Edit Product**: Click the edit icon on any product card
4. **Delete Product**: Click the delete icon on any product card

### Product Management

The admin can manage products with the following fields:

- Product name and description
- Category selection
- SKU and pricing
- Stock information
- Custom specifications
- Product images (placeholder)

### Responsive Design

The website is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Customization

### Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'teal-prime': '#00897B',
  'light-teal': '#80CBC4',
  'orange': '#FF7043',
  'blue': '#4467A3',
  'light-gray': '#FAFAFA',
}
```

### Content

- Update company information in component files
- Modify product categories in `Products.js`
- Add/remove FAQ items in `FAQ.js`
- Update contact information in `Contact.js`

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

### Deploy to Other Platforms

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **AWS S3**: Upload the build folder to an S3 bucket

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@medicare-solutions.com or create an issue in the repository.

---

**MediCare Solutions** - Your Trusted Healthcare Partner
