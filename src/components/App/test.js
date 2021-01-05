export default function ProductsScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useContext(UserContext);

  const addToCart = (item) => {
    const cart = [...user.cart];
    item.cartSuccess = true;
    cart.push(item);
    setUser({
      ...user,
      cart,
    });
  };

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const response = await axios.post("api/handler.php", {
          request: "getCatalogItemsById",
          categoryId: "actions",
        });

        setData(response.data.data.items);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const renderProduct = (arr) => {
    return arr.map((item) => (
      <Product
        key={item.id}
        name={item.name}
        image={item.image}
        oldPrice={item.old_price}
        price={item.price}
        onPress={() => navigation.navigate("Товар", { item })}
        addToCart={() => addToCart(item)}
        addCart={item.cartSuccess !== true}
      />
    ));
  };

  const content = renderProduct(data);

  return (
    <>
      {loading ? (
        <View style={styles.loadingWrap}>
          <Loading />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>{content}</View>
        </ScrollView>
      )}
    </>
  );
}
