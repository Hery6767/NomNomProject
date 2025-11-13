// src/recipes.tsx
import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Pressable,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ==== Palette & assets (giống Home/List) ====
const BRAND = '#0d4d3b';
const BRAND2 = '#0b4a37';
const BRAND_LIGHT = '#eaf6e8';
const BORDER = 'rgba(0,0,0,0.12)';
const BG = '#fff';

type Category = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'All';

type Recipe = {
    id: string;
    title: string;
    image: string;
    rating: number;
    time: string;   // "30 mins"
    cal: string;    // "450 Cal"
    cat: Exclude<Category, 'All'>;
};

const CATEGORIES: { id: Category; title: string; image: string }[] = [
    {
        id: 'Breakfast',
        title: 'Breakfast',
        image:
            'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'Lunch',
        title: 'Lunch',
        image:
            'https://images.unsplash.com/photo-1634141614476-1b421ce4aace?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'Dinner',
        title: 'Dinner',
        image:
            'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'Snacks',
        title: 'Snacks',
        image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    },
];

const RECIPES: Recipe[] = [
    {
        id: 'r1',
        title: 'Honey Garlic Salmon',
        image:
            'https://images.unsplash.com/photo-1604908554024-7f04f8a5dd58?q=80&w=1200&auto=format&fit=crop',
        rating: 4.7,
        time: '30 mins',
        cal: '450 Cal',
        cat: 'Dinner',
    },
    {
        id: 'r2',
        title: 'Goddess Smoothie',
        image:
            'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop',
        rating: 4.3,
        time: '10 mins',
        cal: '180 Cal',
        cat: 'Breakfast',
    },
    {
        id: 'r3',
        title: 'Chicken Tacos',
        image:
            'https://images.unsplash.com/photo-1601050690499-336a8f3aa0fd?q=80&w=1200&auto=format&fit=crop',
        rating: 4.5,
        time: '25 mins',
        cal: '420 Cal',
        cat: 'Lunch',
    },
    {
        id: 'r4',
        title: 'Margherita Pizza',
        image:
            'https://images.unsplash.com/photo-1548365328-9f547fb09530?q=80&w=1200&auto=format&fit=crop',
        rating: 4.2,
        time: '35 mins',
        cal: '520 Cal',
        cat: 'Dinner',
    },
    {
        id: 'r5',
        title: 'Avocado Toast',
        image:
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
        rating: 4.6,
        time: '8 mins',
        cal: '260 Cal',
        cat: 'Breakfast',
    },
    {
        id: 'r6',
        title: 'Yogurt Parfait',
        image:
            'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
        rating: 4.1,
        time: '6 mins',
        cal: '200 Cal',
        cat: 'Snacks',
    },
];

export default function Recipes() {
    // 👇 hook phải nằm TRONG component, không được khai báo ở ngoài file
    const [searchVisible, setSearchVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState<Category>('All');
    const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

    const visibleData = useMemo(() => {
        const byCat =
            activeCat === 'All'
                ? RECIPES
                : RECIPES.filter((r) => r.cat === activeCat);
        if (!search.trim()) return byCat;
        const q = search.toLowerCase();
        return byCat.filter((r) => r.title.toLowerCase().includes(q));
    }, [activeCat, search]);

    const toggleBookmark = (id: string) =>
        setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, { color: BRAND }]}>Discover Recipes</Text>
                <Pressable hitSlop={8} onPress={() => setSearchVisible(true)}>
                    <Image
                        source={require('../assets/icon/search.png')}
                        style={{ width: 18, height: 18, tintColor: BRAND }}
                    />
                </Pressable>
            </View>
            {/* Categories */}
            <View style={styles.sectionHeaderRow}>
                <Text style={[styles.headerTitle, { color: BRAND }]}>Categories</Text>
                <Pressable onPress={() => setActiveCat('All')}>
                    <Text style={styles.link}>Reset</Text>
                </Pressable>
            </View>
            <FlatList
                data={[{ id: 'All', title: 'All', image: '' } as any, ...CATEGORIES]}
                keyExtractor={(i) => i.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={({ item }) => {
                    const active = activeCat === item.id;
                    return (
                        <Pressable
                            onPress={() => setActiveCat(item.id as Category)}
                            style={[
                                styles.catCard,
                                active && { borderColor: BRAND, backgroundColor: BRAND_LIGHT },
                            ]}
                        >
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.catImg} />
                            ) : (
                                <View
                                    style={[
                                        styles.catImg,
                                        { alignItems: 'center', justifyContent: 'center' },
                                    ]}
                                >
                                    <Ionicons name="grid-outline" size={16} color={BRAND2} />
                                </View>
                            )}
                            <Text numberOfLines={1} style={styles.catText}>
                                {item.title}
                            </Text>
                        </Pressable>
                    );
                }}
                style={{ marginBottom: 8 }}
            />

            {/* Recommended */}
            <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: BRAND }]}>Recommended</Text>
            </View>

            <FlatList
                data={visibleData}
                keyExtractor={(i) => i.id}
                numColumns={2}
                columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => { }}
                        style={({ pressed }) => [
                            styles.card,
                            { transform: [{ scale: pressed ? 0.99 : 1 }] },
                        ]}
                    >
                        <View style={styles.imageWrap}>
                            <Image source={{ uri: item.image }} style={styles.cardImg} />
                            {/* Rating badge */}
                            <View style={styles.ratingBadge}>
                                <Image
                                    source={require('../assets/icon/star.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                            </View>
                            {/* Bookmark */}
                            <Pressable
                                onPress={() => toggleBookmark(item.id)}
                                style={styles.bookmark}
                                hitSlop={8}
                            >
                                <Image
                                    source={
                                        bookmarked[item.id]
                                            ? require('../assets/icon/heart-bold.png')   // icon khi đã like
                                            : require('../assets/icon/heart.png')          // icon default
                                    }
                                    style={{ width: 16, height: 16 }}
                                />
                            </Pressable>

                        </View>

                        <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.title}
                        </Text>

                        {/* Meta row */}
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Image
                                    source={require('../assets/icon/clock.png')}
                                    style={{ width: 14, height: 14, tintColor: BRAND }}
                                />
                                <Text style={styles.metaText}>{item.time}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Image
                                    source={require('../assets/icon/fire.png')}
                                    style={{ width: 16, height: 16, tintColor: BRAND }}
                                />
                                <Text style={styles.metaText}>{item.cal}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No recipes match your filter.</Text>
                }
            />

            {/* Popup Search */}
            {
                searchVisible && (
                    <View style={styles.searchOverlay}>
                        <View style={styles.searchPopup}>
                            <Image
                                source={require('../assets/icon/search.png')}
                                style={{ width: 16, height: 16, tintColor: BRAND }}
                            />
                            <TextInput
                                autoFocus
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search recipes..."
                                placeholderTextColor="rgba(0,0,0,0.45)"
                                style={styles.searchPopupInput}
                            />
                            <Pressable
                                onPress={() => {
                                    setSearch('');
                                    setSearchVisible(false);
                                }}
                            >
                                <Image
                                    source={require('../assets/icon/x.png')}
                                    style={{ width: 16, height: 16, tintColor: BRAND }}
                                />
                            </Pressable>
                        </View>
                    </View>
                )
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    searchOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    searchPopup: {
        height: 46,
        borderRadius: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 10,
        borderWidth: 1,
        borderColor: BORDER,
    },
    searchPopupInput: {
        flex: 1,
        fontSize: 14,
        color: '#0b1a18',
    },

    headerRow: {
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#0b1a18' },

    searchBox: {
        marginHorizontal: 16,
        marginBottom: 8,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: { flex: 1, color: '#0b1a18', fontSize: 14, paddingVertical: 10 },

    sectionHeaderRow: {
        marginTop: 8,
        marginBottom: 6,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    sectionTitle: { color: '#0b1a18', fontWeight: '800', fontSize: 18 },
    link: { color: BRAND2, textDecorationLine: 'underline', fontWeight: '700' },

    catCard: {
        width: 88,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 14,
        padding: 8,
        backgroundColor: '#fff',
    },
    catImg: { width: 64, height: 64, borderRadius: 12, marginBottom: 6 },
    catText: { fontSize: 12, color: '#0b1a18', fontWeight: '700' },

    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        overflow: 'hidden',
        marginTop: 12,
    },
    imageWrap: { width: '100%', height: 120, overflow: 'hidden' },
    cardImg: { width: '100%', height: '100%' },
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
    bookmark: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.28)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardTitle: {
        paddingHorizontal: 10,
        paddingTop: 8,
        color: '#0b1a18',
        fontWeight: '800',
        fontSize: 14,
    },
    metaRow: {
        paddingHorizontal: 10,
        paddingTop: 6,
        paddingBottom: 10,
        flexDirection: 'row',
        gap: 10,
    },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { color: BRAND2, fontSize: 11, fontWeight: '700' },

    emptyText: {
        textAlign: 'center',
        marginTop: 24,
        color: BRAND2,
        fontWeight: '700',
    },
});
