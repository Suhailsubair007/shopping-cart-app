# Shopping Cart App

A simple React application that allows users to add products to a shopping cart, manage quantities, and earn a free gift when the subtotal reaches ₹1000. Styled with Tailwind CSS and built without external libraries beyond React.

## Features

- Add products to the cart from a predefined list.
- Update product quantities in the cart with +/- buttons.
- Automatically receive a free "Wireless Mouse" when the subtotal hits ₹1000.
- Progress bar showing how close you are to the free gift threshold.
- Smooth user experience with a notification when the free gift is added.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Git](https://git-scm.com/) (for cloning the repository)

## How to Run the Project

1. **Clone the Repository**
```bash
git clone https://github.com/<your-username>/shopping-cart-app.git
cd shopping-cart-app
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start the Development Server**
```bash
npm start
```
The app will open in your browser at http://localhost:3000.

## Build for Production (Optional)
```bash
npm run build
```
This generates production-ready files in the `build/` directory.

## Project Notes

- Built using React's `useState` and `useEffect` for state management.
- Uses Tailwind CSS for styling, adhering to the restriction on external libraries.
- Meets all requirements from the task document, including the free gift logic and UI designs.

## Deployment

The app is hosted on Vercel: https://shopping-cart-app-orcin.vercel.app/

## Additional Information

Feel free to fork, star, or contribute to this project. If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.