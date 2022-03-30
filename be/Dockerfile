FROM node:alpine
EXPOSE 8080
COPY ./ ./

RUN npm install --legacy-peer-deps 
RUN npm install typescript -g --legacy-peer-deps
RUN tsc
RUN ls -la
CMD ["npm", "run", "pm2"]