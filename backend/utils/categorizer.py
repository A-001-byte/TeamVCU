def auto_categorize(merchant: str) -> str:
    if not merchant:
        return "Uncategorized"

    m = merchant.lower()

    rules = {
        "food": ["zomato", "swiggy", "ubereats", "restaurant", "cafe", "starbucks", "mcdonalds", "kfc", "pizza", "burger"],
        "shopping": ["amazon", "flipkart", "myntra", "ajio", "shopify", "store", "retail", "mart"],
        "transport": ["uber", "ola", "rapido", "metro", "bus", "fuel", "petrol", "railway", "irctc"],
        "entertainment": ["netflix", "spotify", "prime", "hotstar", "cinema", "movie", "bookmyshow"],
        "utilities": ["electricity", "water", "gas", "recharge", "bill", "internet", "broadband", "jio", "airtel"],
        "health": ["pharmacy", "apollo", "hospital", "clinic", "medplus", "doctor", "medical"],
        "income": ["salary", "credited", "payroll", "interest", "dividend"]
    }

    for category, keywords in rules.items():
        for keyword in keywords:
            if keyword in m:
                return category.capitalize()

    return "Other"