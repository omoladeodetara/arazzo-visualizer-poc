import React, { useState } from 'react';
import { ArazzoViewer } from 'arazzo-visualizer-poc';

const sampleArazzoSpec = `arazzo: 1.0.0
info:
  title: E-Commerce Purchase Workflow
  version: 1.0.0
  description: A sample workflow demonstrating the purchase process in an e-commerce application
sourceDescriptions:
  - name: ecommerce-api
    type: openapi
    url: https://api.example.com/openapi.yaml
workflows:
  - workflowId: purchase-flow
    name: purchase-flow
    summary: Complete purchase workflow
    description: This workflow demonstrates a complete purchase process from login to order confirmation
    inputs:
      type: object
      properties:
        username:
          type: string
        password:
          type: string
        productId:
          type: string
    steps:
      - stepId: login
        description: Authenticate user
        operationId: loginUser
        requestBody:
          contentType: application/json
          payload:
            username: $inputs.username
            password: $inputs.password
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          authToken: $response.body.token
      - stepId: get-product
        description: Get product details
        operationId: getProduct
        dependsOn:
          - login
        parameters:
          - name: id
            in: path
            value: $inputs.productId
          - name: Authorization
            in: header
            value: Bearer $steps.login.outputs.authToken
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          productPrice: $response.body.price
          productName: $response.body.name
      - stepId: add-to-cart
        description: Add product to cart
        operationId: addToCart
        dependsOn:
          - get-product
        requestBody:
          contentType: application/json
          payload:
            productId: $inputs.productId
            quantity: 1
        parameters:
          - name: Authorization
            in: header
            value: Bearer $steps.login.outputs.authToken
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          cartId: $response.body.cartId
      - stepId: checkout
        description: Process checkout
        operationId: processCheckout
        dependsOn:
          - add-to-cart
        requestBody:
          contentType: application/json
          payload:
            cartId: $steps.add-to-cart.outputs.cartId
        parameters:
          - name: Authorization
            in: header
            value: Bearer $steps.login.outputs.authToken
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          orderId: $response.body.orderId
          orderTotal: $response.body.total
    outputs:
      orderId: $steps.checkout.outputs.orderId
      totalAmount: $steps.checkout.outputs.orderTotal
      productName: $steps.get-product.outputs.productName
  - workflowId: refund-flow
    name: refund-flow
    summary: Order refund workflow
    description: This workflow handles the refund process for an order
    inputs:
      type: object
      properties:
        orderId:
          type: string
        authToken:
          type: string
    steps:
      - stepId: get-order
        description: Retrieve order details
        operationId: getOrder
        parameters:
          - name: id
            in: path
            value: $inputs.orderId
          - name: Authorization
            in: header
            value: Bearer $inputs.authToken
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          orderStatus: $response.body.status
          orderAmount: $response.body.amount
      - stepId: process-refund
        description: Process the refund
        operationId: createRefund
        dependsOn:
          - get-order
        requestBody:
          contentType: application/json
          payload:
            orderId: $inputs.orderId
            amount: $steps.get-order.outputs.orderAmount
            reason: Customer request
        parameters:
          - name: Authorization
            in: header
            value: Bearer $inputs.authToken
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          refundId: $response.body.refundId
          refundStatus: $response.body.status
    outputs:
      refundId: $steps.process-refund.outputs.refundId
      status: $steps.process-refund.outputs.refundStatus`;

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ArazzoViewer source={sampleArazzoSpec} />
    </div>
  );
}

export default App;
