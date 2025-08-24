      const p = new Proxy({a:10, b:20}, {
        has(target, prop){
          return prop === 'a'; // ⚠️ 只承认a属性存在
        },
      })
      console.log('a' in p);
      console.log('b' in p);