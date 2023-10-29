Imagine that you are storing product data in Redis hashes. 
For each product, you are storing:
* Product Name
* Product Price
* Product Image embedding - A "vector" representation of the product image


**You can create 2 types of vector indexes:**

## Flat index: 
Use this type of index for Exact Nearest Neighbor search. This type of index is best for accuracy.
```redis Create Flat vector index
FT.CREATE "idx1"  // Index name
    ON HASH                // Indicates the type of data to index
        PREFIX 1 "product:"     // Tells the index which keys it should index
    SCHEMA
        "name" TEXT                     // Product Name is indexed as text
        "price" NUMERIC                 // price is indexed as numeric
        "image_vector"  VECTOR FLAT     // For "image vector" create a Flat index. 
            10                          // 10 index parameters follow
            "TYPE" "FLOAT32"            // only FLOAT32 is currently supported
            "DIM" 512                   // Each vector will have 512 dimensions
            "DISTANCE_METRIC" "COSINE"  // Other values could be "IP" "L2"
            "INITIAL_CAP" 5             // Pre-Allocate memory for up to 5 vectors per shard
            "BLOCK_SIZE" 5              
```
## HNSW index: 
Use this type of index for Approximate Nearest Neighbor search. Best for speed.
```redis Create HNSW vector index
FT.CREATE "idx2"  // Index name
    ON HASH                // Indicates the type of data to index
        PREFIX 1 "product:"     // Tells the index which keys it should index
    SCHEMA
        "name" TEXT                     // Product Name is indexed as text
        "price" NUMERIC                 // price is indexed as numeric
        "image_vector" VECTOR HNSW      // For "image vector" create an HSWW index. 
            12                          // 12 index-specific parameters follow
            "TYPE" "FLOAT32"            // only FLOAT32 is currently supported
            "DIM" 512                   // Each vector will have 512 dimensions
            "DISTANCE_METRIC" "COSINE"  // Other values could be "IP" "L2"
            "INITIAL_CAP" 5            // Pre-Allocate memory for up to 5 vectors
            "M" 20                      // HNSW parameter
            "EF_CONSTRUCTION" 100       // HNSW parameter
 ```

## NOTE on image embedding generation:
The "vector representation" of an image, also known as an "embedding", is a list of numbers that provide a representation of the image.

The embeddings are created in such as way that the similarity between two embeddings (two lists of numbers) can be broadly equated to similarity of the original raw images!

You can generate image embeddings by running images through a pre-trained computer vision model
Libraries such as Torchvision or the [Image2vec python package](https://github.com/christiansafka/img2vec) make this super simple to do
