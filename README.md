# use-axios-http-requests-ts

Incredibly useful package for making HTTP requests! This package eliminates the need for the Fetch API and is built on top of the powerful library [axios](https://www.npmjs.com/package/axios).

With useAxios\* hooks offered by use-axios-http-request, you no longer need to create separate states for results, errors, and loading states—everything is handled for you seamlessly!

<div align="center">
 <h1> BUILT ON TOP OF</h1>
</div>

<div align="center">
   <a href="https://axios-http.com"><img src="https://axios-http.com/assets/logo.svg" /></a><br>
</div>
<p align="center">Promise based HTTP client for the browser and node.js</p>

<p align="center">
    <a href="https://axios-http.com/"><b>Website</b></a> •
    <a href="https://axios-http.com/docs/intro"><b>Documentation</b></a>
</p>

# Features

### Special hooks:

| hook         | description                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `useAxios`   | returns an [API response] object containing data from the API, as well as error and loading states.                                        |
| `useAxiosFn` | This function version of axios returns an [API response] Object, including an execute function when invoked automitically triggers the API |

### What matters

1. **parameters**

| parameter      | type        | description                                                                                                                                        | optional |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `url`          | string      | API string                                                                                                                                         | false    |
| `options`      | OptionsType | The `OptionsType` defined below comprises the parameters for making API requests, which include a set of properties can seen in the exmaple below. | true     |
| `params`       | Object      | Object of parameters you want to pass                                                                                                              | true     |
| `dependencies` | Object      | Object of parameters you want to pass                                                                                                              | true     |

2. **return-values**

| parameter | hook                      | description                                                                                  |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `data`    | `useAxios` + `useAxiosFn` | data from an API when request is successfull                                                 |
| `loading` | `useAxios` + `useAxiosFn` | loading state                                                                                |
| `error`   | `useAxios` + `useAxiosFn` | error response/object of type `ErrorType` defined below when request failes or error occured |
| `execute` | `useAxiosFn`              | A custom function which gaves control over when the API call will be trigger                 |

## Types

```js
type OptionsType = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  params?: Object,
  headers?: Object,
};

type ErrorType = {
  status?: number,
  message: string,
};
```

## Installation\*

_npm_

```js
npm install use-axios-http-requests-ts
```

_yarn_

```js
yarn add use-axios-http-requests-ts
```

## Exmaple with Javascript

`App.jsx`

```js
import { useAxios, useAxiosFn } from "use-axios-http-requests-ts";

const Products = () => {
  const PRODUCTS_URL = "https://dummyjson.com/products";
  const SEARCH_PRODUCTS_URL = "https://dummyjson.com/products/search";

  const { data: productsData, error, loading } = useAxios(URL);

  const [query, setQuery] = useState("");

  const {
    execute: SearchProducts,
    data: SearchedData,
    error,
    loading,
  } = useAxiosFn(SEARCH_PRODUCTS_URL, {
    params: {
      q: query,
    },
    [query]
  }); // takes 3 arguments api endpoint, options Object, dependency array

  useEffect(() =>{
    SearchProducts()
  },[query])

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  // We can observe the search results updating in the log below whenever the query changes by invoking the SearchProducts() function inside a useEffect hook.
  console.log('Searched products: ', SearchProducts.products)

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <label htmlFor="search">Search Products</label>
        <input
          autoComplete="off"
          autoCorrect="false"
          type="search"
          name="search"
          id="search"
          value={query}
          onChange={handleSearchInput}
        />
      </div>
      <div className={styles.products}>
        {loading ? (
          <>Loading..</>
        ) : (
          !error &&
          productsData?.products.map((p) => (
            <div key={p.id} className={styles.product}>
              <div className={styles.image}>
                <img src={p.thumbnail} alt={p.title} />
              </div>
              <div className={styles.desc}>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
            </div>
          ))
        )}
        {!loading && error && <div className={styles.error}>{error}</div>}
      </div>;
    </div>
  );
};
```

The only drawback of the approach using JavaScript is that we lack accessibility to data or suggestions for our data properties which can clearly seen below which force us to check the data coming from the API again and again!

<div align="center">
   <img src="https://dev-hub-nextjs-app.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdvzjzf36i%2Fimage%2Fupload%2Fv1710102197%2Fqkblnyxu5qzoqqtqmc4i.png&w=1920&q=75" /<br>
</div>
<br/>

but `solution` is there for every problem
This can be overcome by using useAxios\* hooks inside ts files, below is the difference we will find in ts over js!

Just your `App.jsx` file to `App.tsx` make sure you have all the typescript configurations done and installed typescript as dev dependencies pass the generic type of your expected data type from your API in the useAxios\* hook just like shown below!

## Exmaple with Typescript (minute changes)

```js
type ProductsResponse = {
  products: any[],
  total: number,
  limit: number,
  skip: number,
};
const {
  data: productsData,
  error,
  loading,
} = useAxios<ProductsResponse>(PRODUCTS_URL);
```

Boom! with TypeScript, you gain additional superpowers, as you have access to all the properties present inside the data object now!

<div align="center">
   <img src="https://dev-hub-nextjs-app.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdvzjzf36i%2Fimage%2Fupload%2Fv1710102152%2Fqqnnmlacrogzvpd1rird.png&w=1920&q=75" /<br>
</div>
<br/>

## Happy hacking 

## 🚀 Follow author

[![github](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SoloProgrammer/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pratham-shinde-698a4b240/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/dev_pratham_0g)
