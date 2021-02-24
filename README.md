# robinptExpo

## Requisitos y dependencias


* Node and Yarn
* Expo
* Android Emulator or Android device with expo-client
* For IOS MAC with IOS emulator, or iPhone with expo-client

## Introducción

Se trata de una aplicación sencilla de una sola pantalla, con dos pestañas , en una se muestra el listado de las tiendas, y en la segunda pestañas las tiendas que se han
marcado como favorita. 

También existe un botón "Reset" arriba del listado, que sirve para resetear los datos almacenados en el móvil (cuidado!, si pulsa en este botón se borrarán todas las tiendas
favoritas).

El listado de tienda está pagina, de forma que se van cargando de 10 en 10, según se va llegando al final de la lista. 

## Install 

* Clone Repo with git clone https://github.com/rojo2530/robinptExpo.git
* yarn install
* yarn test (para pasar los test de la app)
* yarn android o yarn ios para correr la App

## Notas sobre el desarrollo

La aplicación se ha realizado en react-native con Expo, como contenedor de estado se ha usado Mobx con mobx-persist para la persistencia de datos en el asyncstorage
del dispositivo. 

También se han realizado test tanto a nivel de componente de React, como en la store de mobx. 





