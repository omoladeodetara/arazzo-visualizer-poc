# Arazzo Visualizer Demo

This project demonstrates the [arazzo-visualizer-poc](https://www.npmjs.com/package/arazzo-visualizer-poc) npm package in action. It provides a working example of visualizing Arazzo API workflow specifications.

## What is Arazzo?

Arazzo is an open standard from the OpenAPI Initiative designed to describe API workflows - sequences of API calls and their dependencies to achieve particular outcomes. The `arazzo-visualizer-poc` is a React component that helps visualize these workflow specifications.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Running the Demo

To start the development server:

```bash
npm run dev
```

Then open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

### Building for Production

To build the application:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## What's Included

This demo includes:

- A sample Arazzo specification (`sample-arazzo.yaml`) demonstrating an e-commerce purchase workflow
- A React application that uses the `ArazzoViewer` component to visualize the workflow
- Two example workflows:
  - **Purchase Flow**: Demonstrates a complete purchase process from login to order confirmation
  - **Refund Flow**: Shows the refund process for an order

## Features

The Arazzo Visualizer provides:

- Visual representation of API workflows
- Step-by-step breakdown of API calls
- Dependency visualization between steps
- Input/output parameter tracking
- Success criteria validation

## Learn More

- [Arazzo Specification](https://spec.openapis.org/arazzo/latest.html)
- [arazzo-visualizer-poc on npm](https://www.npmjs.com/package/arazzo-visualizer-poc)
- [OpenAPI Initiative](https://www.openapis.org/)
