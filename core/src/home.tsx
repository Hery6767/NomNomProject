import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    Dimensions,
    TextInput,
    ScrollView,
    Image,
    Pressable,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CONTENT_W = Math.min(width * 0.92, 420);
const BRAND = '#0d4d3b';
const BRAND2 = '#0b4a37';
const BRAND_LIGHT = '#eaf6e8';
const BORDER = 'rgba(0,0,0,0.12)';
const MUTED = 'rgba(0,0,0,0.6)';
const BG = '#fff';

type DayItem = { key: string; day: string; date: string; active?: boolean };

const headerBG = {
    height: 170,
    backgroundColor: BRAND,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
};

const DAYS: DayItem[] = [
    { key: 'sat', day: 'SAT', date: '10' },
    { key: 'sun', day: 'SUN', date: '11' },
    { key: 'mon', day: 'MON', date: '12', active: true },
    { key: 'tue', day: 'TUE', date: '13' },
    { key: 'wed', day: 'WED', date: '14' },
    { key: 'thu', day: 'THU', date: '15' },
    { key: 'fri', day: 'FRI', date: '16' },
];

const MEALS = [
    {
        id: '1',
        title: 'Fluffy Banana Pancakes',
        image:
            'https://images.unsplash.com/photo-1695046176390-f8c97adb7b17?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=737',
        tags: ['Breakfast', 'Vegetarian'],
        time: '15 mins',
        cal: '250 Cal',
        serving: '2 serving',
    },
    {
        id: '2',
        title: 'Greek Yogurt with Granola',
        image:
            'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
        tags: ['Breakfast', 'Healthy'],
        time: '5 mins',
        cal: '200 Cal',
        serving: '1 serving',
    },
];

const CATEGORIES = [
    {
        id: 'c1',
        title: 'Breakfast',
        image:
            'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'c2',
        title: 'Lunch',
        image:
            'https://images.unsplash.com/photo-1634141614476-1b421ce4aace?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1484',
    },
    {
        id: 'c3',
        title: 'Dinner',
        image:
            'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'c4',
        title: 'Snacks',
        image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    },
];

const POPULAR = [
    {
        id: 'p1',
        title: 'Avocado Toast',
        image:
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
    },
    {
        id: 'p2',
        title: 'Chicken Salad',
        image:
            'https://images.unsplash.com/photo-1661791839093-0b8baf8616ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1373',
        rating: 3.7,
    },
    {
        id: 'p3',
        title: 'Green Smoothie',
        image:
            'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
    },
];

export default function Home() {
    const [query, setQuery] = useState('');
    const [activeDay, setActiveDay] = useState('mon');

    const filteredMeals = useMemo(() => {
        if (!query.trim()) return MEALS;
        return MEALS.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    }, [query]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: BG,
            }}
        >
            <StatusBar barStyle="light-content" />

            {/* Header green */}
            <View style={headerBG as any}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ width: CONTENT_W, alignSelf: 'center', paddingTop: 8 }}>
                        <Text style={styles.smallHello}>Good Morning, Hery</Text>
                        <Text style={styles.bigTitle}>
                            It’s time to cook <Text style={{ color: '#b7f57d' }}>Breakfast</Text>
                        </Text>

                        {/* Search bar */}
                        <View style={styles.searchRow}>
                            <View style={styles.searchBox}>
                                <Image
                                    source={require('../assets/icon/search.png')}
                                    style={{ width: 15, height: 15, tintColor: "rgba(0,0,0,0.40)" }}
                                />
                                <TextInput
                                    value={query}
                                    onChangeText={setQuery}
                                    placeholder="Search"
                                    placeholderTextColor="rgba(0,0,0,0.40)"
                                    style={styles.searchInput}
                                />
                            </View>

                            <Pressable
                                onPress={() => { }}
                                style={({ pressed }) => [
                                    styles.filterBtn,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                            >
                                <Image
                                    source={require('../assets/icon/search.png')}
                                    style={{ width: 20, height: 20, tintColor: BRAND }}
                                />
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            {/* Body */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: CONTENT_W, alignSelf: 'center' }}>
                    {/* Days picker */}
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Breakfast’s Meals</Text>
                        <Pressable hitSlop={6}>
                            <Text style={styles.linkDark}>View Full Plan</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        data={DAYS}
                        keyExtractor={d => d.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginBottom: 12 }}
                        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        renderItem={({ item }) => {
                            const active = activeDay === item.key;
                            return (
                                <Pressable
                                    onPress={() => setActiveDay(item.key)}
                                    style={[
                                        styles.dayPill,
                                        {
                                            backgroundColor: active ? BRAND : BRAND_LIGHT,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dayText,
                                            { color: active ? '#fff' : BRAND2, opacity: active ? 1 : 0.9 },
                                        ]}
                                    >
                                        {item.day}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.dayDate,
                                            { color: active ? '#fff' : BRAND2, opacity: active ? 1 : 0.9 },
                                        ]}
                                    >
                                        {item.date}
                                    </Text>
                                </Pressable>
                            );
                        }}
                    />

                    {/* Meals list */}
                    <View style={{ gap: 10 }}>
                        {filteredMeals.map(m => (
                            <Pressable
                                key={m.id}
                                style={({ pressed }) => [
                                    styles.mealCard,
                                    { transform: [{ scale: pressed ? 0.99 : 1 }] },
                                ]}
                                onPress={() => { }}
                            >
                                <Image source={{ uri: m.image }} style={styles.mealImg} />
                                <View style={{ flex: 1, paddingVertical: 10 }}>
                                    <Text numberOfLines={1} style={styles.mealTitle}>
                                        {m.title}
                                    </Text>

                                    {/* tags */}
                                    <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                                        {m.tags.map(t => (
                                            <View key={t} style={styles.tag}>
                                                <Text style={styles.tagText}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* meta */}
                                    <View style={styles.metaRow}>
                                        <View style={styles.metaItem}>
                                            <Image
                                                source={require('../assets/icon/clock.png')}
                                                style={{ width: 14, height: 14, tintColor: BRAND }}
                                            />
                                            <Text style={styles.metaText}>{m.time}</Text>
                                        </View>
                                        <View style={styles.metaItem}>
                                            <Image
                                                source={require('../assets/icon/fire.png')}
                                                style={{ width: 16, height: 16, tintColor: BRAND }}
                                            />
                                            <Text style={styles.metaText}>{m.cal}</Text>
                                        </View>
                                        <View style={styles.metaItem}>
                                            <Image
                                                source={require('../assets/icon/serving.png')}
                                                style={{ width: 14, height: 14, tintColor: BRAND }}
                                            />
                                            <Text style={styles.metaText}>{m.serving}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    {/* Explore categories */}
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Explore Categories</Text>
                        <Pressable>
                            <Text style={styles.linkDark}>View All</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        data={CATEGORIES}
                        keyExtractor={i => i.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        renderItem={({ item }) => (
                            <Pressable style={styles.catCard}>
                                <Image source={{ uri: item.image }} style={styles.catImg} />
                                <Text numberOfLines={1} style={styles.catText}>
                                    {item.title}
                                </Text>
                            </Pressable>
                        )}
                        style={{ marginBottom: 8 }}
                    />

                    {/* Popular */}
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Popular Recipes</Text>
                        <Pressable>
                            <Text style={styles.linkDark}>View All</Text>
                        </Pressable>
                    </View>

                    <View style={{ gap: 12 }}>
                        {POPULAR.map(p => (
                            <Pressable key={p.id} style={styles.popCard}>
                                <Image source={{ uri: p.image }} style={styles.popImg} />
                                <View style={{ padding: 10 }}>
                                    <View style={styles.ratingBadge}>
                                        <Ionicons name="star" size={12} color="#fff" />
                                        <Text style={styles.ratingText}>{p.rating}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    smallHello: {
        color: '#eaf6e8',
        fontSize: 12,
        opacity: 0.95,
    },
    bigTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '800',
        marginTop: 4,
    },
    searchRow: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        color: '#0b1a18',
        fontSize: 14,
        paddingVertical: Platform.select({ ios: 10, android: 6 }),
    },
    filterBtn: {
        height: 44,
        width: 44,
        borderRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    sectionHeaderRow: {
        marginTop: 14,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    sectionTitle: {
        color: '#0b1a18',
        fontWeight: '800',
        fontSize: 18,
    },
    linkDark: {
        color: BRAND2,
        textDecorationLine: 'underline',
        fontWeight: '700',
    },

    dayPill: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        width: 64,
    },
    dayText: { fontSize: 12, fontWeight: '700' },
    dayDate: { marginTop: 2, fontSize: 14, fontWeight: '800' },

    mealCard: {
        flexDirection: 'row',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    mealImg: { width: 76, height: 76, borderRadius: 12, margin: 10 },
    mealTitle: { color: '#0b1a18', fontWeight: '800', fontSize: 16 },
    tag: {
        backgroundColor: BRAND_LIGHT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    tagText: { color: BRAND2, fontSize: 11, fontWeight: '700' },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { color: BRAND2, fontSize: 11, fontWeight: '700' },

    catCard: {
        width: 88,
        alignItems: 'center',
    },
    catImg: {
        width: 76,
        height: 76,
        borderRadius: 18,
    },
    catText: {
        marginTop: 6,
        fontSize: 12,
        color: '#0b1a18',
        fontWeight: '700',
    },

    popCard: {
        height: 130,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    popImg: { width: '100%', height: '100%' },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: BRAND,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: { color: '#fff', fontSize: 12, fontWeight: '800' },
});
